/* =============================================
   FreshCart - Cart Controller
   ============================================= */
const { pool } = require('../config/db');
const { asyncHandler } = require('../utils/helpers');

/**
 * GET /api/cart
 */
const getCart = asyncHandler(async (req, res) => {
  const [items] = await pool.query(
    `SELECT ci.id, ci.product_id, ci.quantity,
            p.name, p.emoji, p.price, p.original_price, p.discount, p.category_slug
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?
     ORDER BY ci.created_at DESC`,
    [req.userId]
  );

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : (subtotal === 0 ? 0 : 40);
  const total = subtotal + deliveryFee;

  res.json({
    success: true,
    data: {
      items,
      summary: { subtotal, deliveryFee, total, itemCount: items.reduce((s, i) => s + i.quantity, 0) },
    },
  });
});

/**
 * POST /api/cart
 * Body: { productId, quantity }
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ success: false, message: 'productId is required.' });
  }

  // Check product exists
  const [product] = await pool.query('SELECT id, name, stock FROM products WHERE id = ? AND is_active = TRUE', [productId]);
  if (product.length === 0) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  // Upsert cart item (add quantity if exists)
  await pool.query(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
    [req.userId, productId, quantity]
  );

  res.status(201).json({
    success: true,
    message: `${product[0].name} added to cart!`,
  });
});

/**
 * PUT /api/cart/:id
 * Body: { quantity }
 */
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;

  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    await pool.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [cartItemId, req.userId]);
    return res.json({ success: true, message: 'Item removed from cart.' });
  }

  await pool.query(
    'UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?',
    [quantity, cartItemId, req.userId]
  );

  res.json({ success: true, message: 'Cart updated.' });
});

/**
 * DELETE /api/cart/:id
 */
const removeFromCart = asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ success: true, message: 'Item removed from cart.' });
});

/**
 * DELETE /api/cart
 * Clear entire cart
 */
const clearCart = asyncHandler(async (req, res) => {
  await pool.query('DELETE FROM cart_items WHERE user_id = ?', [req.userId]);
  res.json({ success: true, message: 'Cart cleared.' });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
