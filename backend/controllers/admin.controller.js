/* =============================================
   FreshCart - Admin Controller
   ============================================= */
const { pool } = require('../config/db');
const { asyncHandler } = require('../utils/helpers');

/**
 * GET /api/admin/stats
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM users WHERE role = "customer"');
  const [[{ totalProducts }]] = await pool.query('SELECT COUNT(*) as totalProducts FROM products WHERE is_active = TRUE');
  const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) as totalOrders FROM orders');
  const [[{ totalRevenue }]] = await pool.query('SELECT COALESCE(SUM(total), 0) as totalRevenue FROM orders WHERE status != "cancelled"');
  const [[{ pendingOrders }]] = await pool.query('SELECT COUNT(*) as pendingOrders FROM orders WHERE status = "processing"');
  const [[{ deliveredOrders }]] = await pool.query('SELECT COUNT(*) as deliveredOrders FROM orders WHERE status = "delivered"');

  // Recent orders
  const [recentOrders] = await pool.query(
    `SELECT o.id, o.order_code, o.full_name, o.total, o.status, o.created_at,
            (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
     FROM orders o
     ORDER BY o.created_at DESC
     LIMIT 10`
  );

  // Top selling products
  const [topProducts] = await pool.query(
    `SELECT p.id, p.name, p.emoji, p.price, SUM(oi.quantity) as total_sold
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     GROUP BY p.id
     ORDER BY total_sold DESC
     LIMIT 5`
  );

  res.json({
    success: true,
    data: {
      stats: { totalUsers, totalProducts, totalOrders, totalRevenue, pendingOrders, deliveredOrders },
      recentOrders,
      topProducts,
    },
  });
});

/**
 * PUT /api/admin/products/:id
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, original_price, discount, stock, is_active } = req.body;

  await pool.query(
    `UPDATE products SET
      name = COALESCE(?, name),
      price = COALESCE(?, price),
      original_price = COALESCE(?, original_price),
      discount = COALESCE(?, discount),
      stock = COALESCE(?, stock),
      is_active = COALESCE(?, is_active)
     WHERE id = ?`,
    [name, price, original_price, discount, stock, is_active, req.params.id]
  );

  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  res.json({ success: true, message: 'Product updated.', data: rows[0] });
});

/**
 * PUT /api/admin/orders/:id
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, track_step } = req.body;

  const statusMap = {
    'processing': 1,
    'packed': 2,
    'out_for_delivery': 3,
    'delivered': 4,
    'cancelled': 0,
  };

  const step = track_step !== undefined ? track_step : (statusMap[status] !== undefined ? statusMap[status] : 1);

  // Check existing order
  const [existing] = await pool.query('SELECT id, status FROM orders WHERE id = ?', [req.params.id]);
  if (existing.length === 0) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  const prevStatus = existing[0].status;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      'UPDATE orders SET status = ?, track_step = ? WHERE id = ?',
      [status, step, req.params.id]
    );

    // If changing to cancelled, restore product stock
    if (status === 'cancelled' && prevStatus !== 'cancelled') {
      const [items] = await connection.query(
        'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
        [req.params.id]
      );
      for (const item of items) {
        await connection.query(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
    }

    await connection.commit();
    res.json({ success: true, message: `Order status updated to ${status}.` });
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
});

/**
 * GET /api/admin/orders
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT * FROM orders';
  const params = [];

  if (status) {
    query += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  const [orders] = await pool.query(query, params);

  for (const order of orders) {
    const [items] = await pool.query(
      'SELECT name, emoji, price, quantity FROM order_items WHERE order_id = ?',
      [order.id]
    );
    order.items = items;
  }

  res.json({ success: true, data: orders });
});

module.exports = { getDashboardStats, updateProduct, updateOrderStatus, getAllOrders };
