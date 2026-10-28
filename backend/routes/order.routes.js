/* =============================================
   FreshCart - Order Routes
   ============================================= */
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { placeOrder, getOrders, getOrderById, cancelOrder } = require('../controllers/order.controller');

// All order routes are protected
router.use(protect);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
