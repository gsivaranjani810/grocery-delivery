/* =============================================
   FreshCart Backend - Utility Helpers
   ============================================= */

/**
 * Generate a unique order code like "FC12345"
 */
function generateOrderCode() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `FC${num}`;
}

/**
 * Calculate delivery fee
 */
function calculateDeliveryFee(subtotal) {
  const FREE_ABOVE = 499;
  const DELIVERY_FEE = 40;
  return subtotal >= FREE_ABOVE ? 0 : DELIVERY_FEE;
}

/**
 * Wrap async route handlers to catch errors
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { generateOrderCode, calculateDeliveryFee, asyncHandler };
