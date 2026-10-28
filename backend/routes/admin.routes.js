/* =============================================
   FreshCart - Admin Routes
   ============================================= */
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getDashboardStats, updateProduct, updateOrderStatus, getAllOrders } = require('../controllers/admin.controller');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.put('/products/:id', updateProduct);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
