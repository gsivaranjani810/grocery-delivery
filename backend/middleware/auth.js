/* =============================================
   FreshCart Backend - JWT Auth Middleware
   ============================================= */
const jwt = require('jsonwebtoken');

/**
 * Protect routes - requires valid JWT token
 */
function protect(req, res, next) {
  let token;

  // Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired.',
    });
  }
}

/**
 * Admin-only routes
 */
function adminOnly(req, res, next) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required.',
    });
  }
  next();
}

module.exports = { protect, adminOnly };
