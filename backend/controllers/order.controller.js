/* =============================================
   FreshCart - Order Controller
   ============================================= */
const { pool } = require('../config/db');
const { asyncHandler, generateOrderCode, calculateDeliveryFee } = require('../utils/helpers');

/**
 * POST /api/orders
 * Body: { fullName, phone, address, city, pincode, paymentMethod }
 */
const placeOrder = asyncHandler(async (req, res) => {
  const { fullName, phone, address, city, pincode, paymentMethod = 'cod' } = req.body;

  // Validate
  if (!fullName || !phone || !address || !city || !pincode) {
    return res.status(400).json({ success: false, message: 'All delivery details are required.' });
  }

  // Get cart items
  const [cartItems] = await pool.query(
    `SELECT ci.product_id, ci.quantity, p.name, p.emoji, p.price, p.stock
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?`,
    [req.userId]
  );

  if (cartItems.length === 0) {
    return res.status(400).json({ success: false, message: 'Your cart is empty!' });
  }

  // Check stock
  for (const item of cartItems) {
    if (item.quantity > item.stock) {
      return res.status(400).json({
        success: false,
        message: `${item.name} has only ${item.stock} units in stock.`,
      });
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;
  const orderCode = generateOrderCode();

  // Use transaction
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (order_code, user_id, full_name, phone, address, city, pincode, subtotal, delivery_fee, total, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderCode, req.userId, fullName, phone, address, city, pincode, subtotal, deliveryFee, total, paymentMethod]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    const itemValues = cartItems.map(item => [orderId, item.product_id, item.name, item.emoji, item.price, item.quantity]);
    await connection.query(
      'INSERT INTO order_items (order_id, product_id, name, emoji, price, quantity) VALUES ?',
      [itemValues]
    );

    // Update product stock
    for (const item of cartItems) {
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Clear cart
    await connection.query('DELETE FROM cart_items WHERE user_id = ?', [req.userId]);

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        orderCode,
        orderId,
        total,
        deliveryFee,
        paymentMethod,
        itemCount: cartItems.length,
        estimatedDelivery: '15-30 minutes',
      },
    });
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
});

/**
 * GET /api/orders
 */
const getOrders = asyncHandler(async (req, res) => {
  const [orders] = await pool.query(
    `SELECT id, order_code, full_name, phone, address, city, pincode,
            subtotal, delivery_fee, total, payment_method, status, track_step,
            created_at, updated_at
     FROM orders
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [req.userId]
  );

  // Get items for each order
  for (const order of orders) {
    const [items] = await pool.query(
      'SELECT product_id, name, emoji, price, quantity FROM order_items WHERE order_id = ?',
      [order.id]
    );
    order.items = items;
  }

  res.json({ success: true, data: orders });
});

/**
 * GET /api/orders/:id
 */
const getOrderById = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  const order = rows[0];
  const [items] = await pool.query(
    'SELECT product_id, name, emoji, price, quantity FROM order_items WHERE order_id = ?',
    [order.id]
  );
  order.items = items;

  res.json({ success: true, data: order });
});

/**
 * PUT /api/orders/:id/cancel
 * Body: { reason }
 */
const cancelOrder = asyncHandler(async (req, res) => {
  const orderIdentifier = req.params.id;
  const { reason = 'Cancelled by customer' } = req.body;

  // Find order for this user (support both numeric ID and order_code)
  const [rows] = await pool.query(
    'SELECT * FROM orders WHERE (id = ? OR order_code = ?) AND user_id = ?',
    [orderIdentifier, orderIdentifier, req.userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  const order = rows[0];

  if (order.status === 'cancelled') {
    return res.status(400).json({ success: false, message: 'Order is already cancelled.' });
  }

  if (order.status === 'delivered') {
    return res.status(400).json({ success: false, message: 'Delivered orders cannot be cancelled.' });
  }

  if (order.status === 'out_for_delivery') {
    return res.status(400).json({
      success: false,
      message: 'Order is already out for delivery. You can reject delivery upon arrival or contact support.',
    });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update order status and track_step
    await connection.query(
      'UPDATE orders SET status = ?, track_step = ? WHERE id = ?',
      ['cancelled', 0, order.id]
    );

    // Get order items to restore product stock
    const [items] = await connection.query(
      'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
      [order.id]
    );

    for (const item of items) {
      await connection.query(
        'UPDATE products SET stock = stock + ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.json({
      success: true,
      message: 'Order cancelled successfully. Stock has been restored.',
      data: {
        orderId: order.id,
        orderCode: order.order_code,
        status: 'cancelled',
        reason,
      },
    });
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
});

module.exports = { placeOrder, getOrders, getOrderById, cancelOrder };
