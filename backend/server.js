/* =============================================
   FreshCart Backend - Express Server
   =============================================
   Node.js + Express + MySQL
   
   Features:
   - RESTful JSON API
   - JWT Authentication
   - CORS enabled for frontend
   - Static file serving for frontend
   - MySQL database with connection pooling
   ============================================= */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error');

// Import routes
const authRoutes     = require('./routes/auth.routes');
const productRoutes  = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const cartRoutes     = require('./routes/cart.routes');
const orderRoutes    = require('./routes/order.routes');
const adminRoutes    = require('./routes/admin.routes');
const feedbackRoutes = require('./routes/feedback.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// MIDDLEWARE
// =============================================
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// SERVE FRONTEND STATIC FILES
// =============================================
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use('/css', express.static(path.join(__dirname, '..', 'frontend', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'frontend', 'js')));
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'assets')));

// =============================================
// API ROUTES
// =============================================
app.use('/api/auth',       authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart',       cartRoutes);
app.use('/api/orders',     orderRoutes);
app.use('/api/admin',      adminRoutes);
app.use('/api/feedback',   feedbackRoutes);

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FreshCart API is running! 🛒',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// =============================================
// CATCH-ALL: Serve index.html for frontend routes
// =============================================
app.get('*', (req, res, next) => {
  // Only serve HTML for non-API routes
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// =============================================
// ERROR HANDLING
// =============================================
app.use(notFound);
app.use(errorHandler);

// =============================================
// START SERVER
// =============================================
async function startServer() {
  // Test database connection
  await testConnection();

  app.listen(PORT, () => {
    console.log('');
    console.log('🛒 ═══════════════════════════════════════');
    console.log(`   FreshCart Backend API`);
    console.log('   ═══════════════════════════════════════');
    console.log(`   🌐 Server:    http://localhost:${PORT}`);
    console.log(`   📡 API:       http://localhost:${PORT}/api`);
    console.log(`   🏥 Health:    http://localhost:${PORT}/api/health`);
    console.log(`   📂 Frontend:  http://localhost:${PORT}`);
    console.log(`   🔧 Env:       ${process.env.NODE_ENV || 'development'}`);
    console.log('   ═══════════════════════════════════════');
    console.log('');
  });
}

startServer();
