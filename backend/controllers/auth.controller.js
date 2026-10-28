/* =============================================
   FreshCart - Auth Controller
   ============================================= */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { asyncHandler } = require('../utils/helpers');

/**
 * Generate JWT token
 */
function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/**
 * POST /api/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validate
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  // Check existing user
  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert user
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, phone || null]
  );

  const user = { id: result.insertId, name, email, role: 'customer' };
  const token = signToken(user);

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    data: { user: { id: user.id, name, email, role: 'customer' }, token },
  });
});

/**
 * POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  // Find user
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const user = rows[0];

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = signToken(user);

  res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    data: {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    },
  });
});

/**
 * GET /api/auth/profile
 */
const getProfile = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
    [req.userId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.json({ success: true, data: rows[0] });
});

/**
 * PUT /api/auth/profile
 */
const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  await pool.query(
    'UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone) WHERE id = ?',
    [name, phone, req.userId]
  );

  const [rows] = await pool.query(
    'SELECT id, name, email, phone, role FROM users WHERE id = ?',
    [req.userId]
  );

  res.json({ success: true, message: 'Profile updated.', data: rows[0] });
});

module.exports = { register, login, getProfile, updateProfile };
