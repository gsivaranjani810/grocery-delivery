-- =============================================
-- FreshCart - MySQL Database Schema
-- =============================================

CREATE DATABASE IF NOT EXISTS freshcart
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE freshcart;

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  phone       VARCHAR(15) DEFAULT NULL,
  role        ENUM('customer', 'admin') DEFAULT 'customer',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(50) NOT NULL UNIQUE,
  name        VARCHAR(100) NOT NULL,
  emoji       VARCHAR(10) DEFAULT '🛒',
  item_count  INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  category_slug VARCHAR(50) NOT NULL,
  emoji         VARCHAR(10) DEFAULT '🛒',
  price         DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2) DEFAULT NULL,
  discount      INT DEFAULT 0,
  rating        DECIMAL(2,1) DEFAULT 0.0,
  reviews       INT DEFAULT 0,
  stock         INT DEFAULT 100,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_slug) REFERENCES categories(slug) ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- ADDRESSES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS addresses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  full_name   VARCHAR(100) NOT NULL,
  phone       VARCHAR(15) NOT NULL,
  address     VARCHAR(500) NOT NULL,
  city        VARCHAR(100) NOT NULL,
  pincode     VARCHAR(10) NOT NULL,
  is_default  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- CART ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS cart_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  product_id  INT NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_cart_item (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_code    VARCHAR(20) NOT NULL UNIQUE,
  user_id       INT NOT NULL,
  full_name     VARCHAR(100) NOT NULL,
  phone         VARCHAR(15) NOT NULL,
  address       VARCHAR(500) NOT NULL,
  city          VARCHAR(100) NOT NULL,
  pincode       VARCHAR(10) NOT NULL,
  subtotal      DECIMAL(10,2) NOT NULL,
  delivery_fee  DECIMAL(10,2) DEFAULT 0.00,
  total         DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'cod',
  status        ENUM('processing', 'packed', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'processing',
  track_step    INT DEFAULT 1,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    INT NOT NULL,
  product_id  INT NOT NULL,
  name        VARCHAR(200) NOT NULL,
  emoji       VARCHAR(10) DEFAULT '🛒',
  price       DECIMAL(10,2) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =============================================
-- OFFERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS offers (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  tag           VARCHAR(50) NOT NULL,
  title         VARCHAR(200) NOT NULL,
  description   TEXT,
  emoji         VARCHAR(10) DEFAULT '🎉',
  gradient      VARCHAR(200) DEFAULT 'linear-gradient(135deg,#22c55e,#16a34a)',
  category_slug VARCHAR(50) DEFAULT 'all',
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA: CATEGORIES
-- =============================================
INSERT INTO categories (slug, name, emoji, item_count) VALUES
  ('fruits',     'Fruits',         '🍎', 6),
  ('vegetables', 'Vegetables',     '🥦', 5),
  ('dairy',      'Dairy & Eggs',   '🥛', 3),
  ('bakery',     'Bakery',         '🍞', 3),
  ('beverages',  'Beverages',      '🧃', 4),
  ('snacks',     'Snacks',         '🍪', 3),
  ('grains',     'Rice & Grains',  '🌾', 3),
  ('care',       'Personal Care',  '🧴', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- =============================================
-- SEED DATA: PRODUCTS
-- =============================================
INSERT INTO products (name, category_slug, emoji, price, original_price, discount, rating, reviews) VALUES
  ('Fresh Red Apples',        'fruits',     '🍎', 89.00,  110.00, 19, 4.5, 234),
  ('Ripe Bananas (6 pcs)',    'fruits',     '🍌', 45.00,  60.00,  25, 4.3, 189),
  ('Fresh Oranges (5 pcs)',   'fruits',     '🍊', 75.00,  90.00,  17, 4.6, 156),
  ('Juicy Mangoes (2 pcs)',   'fruits',     '🥭', 120.00, 150.00, 20, 4.8, 312),
  ('Fresh Strawberries',      'fruits',     '🍓', 150.00, 180.00, 17, 4.7, 98),
  ('Blueberries (200g)',      'fruits',     '🫐', 199.00, 249.00, 20, 4.4, 67),
  ('Fresh Tomatoes (1kg)',    'vegetables', '🍅', 35.00,  45.00,  22, 4.2, 445),
  ('Potatoes (2kg)',          'vegetables', '🥔', 40.00,  50.00,  20, 4.0, 378),
  ('Fresh Spinach (500g)',    'vegetables', '🥬', 28.00,  35.00,  20, 4.3, 210),
  ('Baby Carrots (500g)',     'vegetables', '🥕', 55.00,  70.00,  21, 4.5, 134),
  ('Broccoli (1 head)',       'vegetables', '🥦', 65.00,  80.00,  19, 4.4, 89),
  ('Full Cream Milk (1L)',    'dairy',      '🥛', 62.00,  75.00,  17, 4.6, 567),
  ('Amul Butter (500g)',      'dairy',      '🧈', 240.00, 260.00, 8,  4.7, 342),
  ('Eggs (12 pcs)',           'dairy',      '🥚', 90.00,  110.00, 18, 4.5, 456),
  ('Whole Wheat Bread',       'bakery',     '🍞', 45.00,  55.00,  18, 4.3, 289),
  ('Croissant (4 pcs)',       'bakery',     '🥐', 120.00, 150.00, 20, 4.5, 145),
  ('Multigrain Buns (6 pcs)', 'bakery',     '🧁', 75.00,  90.00,  17, 4.2, 78),
  ('Orange Juice (1L)',       'beverages',  '🧃', 99.00,  120.00, 18, 4.6, 234),
  ('Green Tea (25 bags)',     'beverages',  '🍵', 85.00,  110.00, 23, 4.4, 156),
  ('Coconut Water (500ml)',   'beverages',  '🥥', 45.00,  55.00,  18, 4.7, 198),
  ('Mango Juice (1L)',        'beverages',  '🍹', 79.00,  95.00,  17, 4.3, 112),
  ('Digestive Biscuits',      'snacks',     '🍪', 55.00,  65.00,  15, 4.3, 389),
  ('Mixed Nuts (200g)',       'snacks',     '🥜', 185.00, 220.00, 16, 4.6, 167),
  ('Potato Chips (200g)',     'snacks',     '🫙', 65.00,  80.00,  19, 4.1, 234),
  ('Basmati Rice (5kg)',      'grains',     '🌾', 380.00, 450.00, 16, 4.7, 445),
  ('Sunflower Oil (1L)',      'grains',     '🫗', 145.00, 175.00, 17, 4.4, 234),
  ('Whole Wheat Flour (2kg)', 'grains',     '🌾', 89.00,  110.00, 19, 4.3, 178),
  ('Dove Shampoo (400ml)',    'care',       '🧴', 280.00, 330.00, 15, 4.5, 123),
  ('Soap Pack (4 bars)',      'care',       '🧼', 120.00, 140.00, 14, 4.4, 89)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- =============================================
-- SEED DATA: OFFERS
-- =============================================
INSERT INTO offers (tag, title, description, emoji, gradient, category_slug) VALUES
  ('Limited Time', '20% OFF on Fruits',    'Get fresh seasonal fruits at unbeatable prices!',             '🍎', 'linear-gradient(135deg,#22c55e,#16a34a)', 'fruits'),
  ('Weekend Deal', 'Buy 1 Get 1 Free',     'On selected dairy products — grab them before they run out!', '🥛', 'linear-gradient(135deg,#f97316,#ea580c)', 'dairy'),
  ('Always On',    'Free Delivery',         'On all orders above Rs.499. No minimum hassle!',              '🚚', 'linear-gradient(135deg,#3b82f6,#2563eb)', 'all'),
  ('Flash Deal',   '30% OFF Bakery',        'Freshly baked breads, buns & croissants today!',              '🍞', 'linear-gradient(135deg,#eab308,#ca8a04)', 'bakery'),
  ('New Arrival',  'Fresh Beverages',       'Cold drinks and juices at special introductory prices.',       '🧃', 'linear-gradient(135deg,#8b5cf6,#7c3aed)', 'beverages'),
  ('Bulk Save',    'Grains & Rice Offer',   'Buy in bulk and save up to 25% on rice & grains.',            '🌾', 'linear-gradient(135deg,#ec4899,#db2777)', 'grains')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- =============================================
-- SEED DATA: USERS (Admin password: admin123 | Customer password: user123)
-- =============================================
INSERT INTO users (name, email, password, phone, role) VALUES
  ('Admin',           'admin@freshcart.in',        '$2a$10$5j24Zn9G5Gl9IJ5Qxk4JZePw.XvPPeozc1d76UjvlnXNG2dCDzR3q', '9876543210', 'admin'),
  ('Store Manager',   'manager@freshcart.in',      '$2a$10$5j24Zn9G5Gl9IJ5Qxk4JZePw.XvPPeozc1d76UjvlnXNG2dCDzR3q', '9876501234', 'admin'),
  ('Priya Sundaram',  'priya@gmail.com',           '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9840123456', 'customer'),
  ('Karthik Raja',    'karthik.r@example.com',     '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9841987654', 'customer'),
  ('Ananya Ramesh',   'ananya.ramesh@example.com', '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9444112233', 'customer'),
  ('Venkatesh Kumar', 'venkat.k@example.com',      '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9884556677', 'customer'),
  ('Sneha Patel',     'sneha.p@example.com',       '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9823456789', 'customer'),
  ('Rahul Sharma',    'rahul.sharma@example.com',  '$2a$10$y.q0AaIXpKGHfHKVaKZuS.JR6gN93SFOQkst3uKOX0huuXJC1cDtK', '9711223344', 'customer')
ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password), phone=VALUES(phone), role=VALUES(role);

-- =============================================
-- CUSTOMER FEEDBACK TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS customer_feedback (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT DEFAULT NULL,
  order_id    VARCHAR(50) DEFAULT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL,
  phone       VARCHAR(20) DEFAULT NULL,
  rating      INT NOT NULL,
  category    VARCHAR(50) DEFAULT 'General Experience',
  nps_score   INT DEFAULT 10,
  tags        VARCHAR(255) DEFAULT '',
  message     TEXT NOT NULL,
  status      ENUM('approved', 'pending', 'hidden') DEFAULT 'approved',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA: CUSTOMER FEEDBACK
-- =============================================
INSERT INTO customer_feedback (order_id, name, email, phone, rating, category, nps_score, tags, message, status) VALUES
  ('FC-91823', 'Priya Sundaram', 'priya.s@example.com', '9840123456', 5, '15-Min Delivery Speed', 10, '⚡ Lightning Fast, 🥦 Super Fresh', 'Ordered fresh spinach, tomatoes and milk at 8:15 AM and it was at my doorstep by 8:28 AM in Chennai! Absolutely unbelievable speed and top quality produce.', 'approved'),
  ('FC-88210', 'Karthik Raja', 'karthik.r@example.com', '9841987654', 5, 'Freshness & Quality', 10, '🥦 Super Fresh, 📦 Spill-Free Box', 'The mangoes and strawberries were handpicked and so sweet. Packaging was 100% eco-friendly and items were chilled and pristine.', 'approved'),
  ('FC-77341', 'Ananya Ramesh', 'ananya.ramesh@example.com', '9444112233', 4, 'Packaging & Care', 9, '📦 Spill-Free Box, 😊 Friendly Delivery', 'Delivery partner called politely and handed over the grocery bag safely. Really impressed with how neat everything was organized inside.', 'approved'),
  ('FC-65412', 'Venkatesh Kumar', 'venkat.k@example.com', '9884556677', 5, 'Prices & Offers', 10, '💰 Great Discount, ⚡ Lightning Fast', 'Got 20% off on fruits and free delivery! Cheaper than my local supermarket and delivered in under 20 minutes.', 'approved');

