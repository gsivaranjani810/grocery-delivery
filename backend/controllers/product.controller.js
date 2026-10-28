/* =============================================
   FreshCart - Product Controller
   ============================================= */
const { pool } = require('../config/db');
const { asyncHandler } = require('../utils/helpers');

/**
 * GET /api/products
 * Query params: category, search, sort, page, limit
 */
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, sort, page = 1, limit = 50 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT * FROM products WHERE is_active = TRUE';
  const params = [];

  // Filter by category
  if (category && category !== 'all') {
    query += ' AND category_slug = ?';
    params.push(category);
  }

  // Search by name or category
  if (search) {
    query += ' AND (name LIKE ? OR category_slug LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  // Sort
  switch (sort) {
    case 'price-asc':      query += ' ORDER BY price ASC'; break;
    case 'price-desc':     query += ' ORDER BY price DESC'; break;
    case 'rating-desc':    query += ' ORDER BY rating DESC'; break;
    case 'discount-desc':  query += ' ORDER BY discount DESC'; break;
    default:               query += ' ORDER BY id ASC'; break;
  }

  // Count total
  const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
  const [countRows] = await pool.query(countQuery, params);
  const total = countRows[0].total;

  // Paginate
  query += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), offset);

  const [products] = await pool.query(query, params);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit)),
    },
  });
});

/**
 * GET /api/products/:id
 */
const getProductById = asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [req.params.id]);

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  res.json({ success: true, data: rows[0] });
});

module.exports = { getProducts, getProductById };
