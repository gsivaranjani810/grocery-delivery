/* =============================================
   FreshCart - Category Controller
   ============================================= */
const { pool } = require('../config/db');
const { asyncHandler } = require('../utils/helpers');

/**
 * GET /api/categories
 */
const getCategories = asyncHandler(async (req, res) => {
  const [categories] = await pool.query(
    'SELECT id, slug, name, emoji, item_count FROM categories ORDER BY id ASC'
  );

  res.json({ success: true, data: categories });
});

/**
 * GET /api/categories/:slug
 */
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM categories WHERE slug = ?',
    [req.params.slug]
  );

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Category not found.' });
  }

  // Also get products for this category
  const [products] = await pool.query(
    'SELECT * FROM products WHERE category_slug = ? AND is_active = TRUE ORDER BY rating DESC',
    [req.params.slug]
  );

  res.json({
    success: true,
    data: { category: rows[0], products },
  });
});

module.exports = { getCategories, getCategoryBySlug };
