/* =============================================
   FreshCart - Customer Feedback Routes
   ============================================= */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  submitFeedback,
  getFeedbacks,
  getFeedbackStats
} = require('../controllers/feedback.controller');

// Optional auth middleware: extracts user ID if Bearer token present
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      req.userRole = decoded.role;
    } catch {
      // Ignore token errors for optional auth
    }
  }
  next();
}

// Routes
router.post('/', optionalAuth, submitFeedback);
router.get('/', getFeedbacks);
router.get('/stats', getFeedbackStats);

module.exports = router;
