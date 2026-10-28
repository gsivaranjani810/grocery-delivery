/* ========================================
   FreshCart - script.js (Real Multi-Page E-Commerce)
   All pages share this script.
======================================== */
'use strict';

// ===========================================
// DATA
// ===========================================
const CATEGORIES = [
  { id:'all',        name:'All Products',  emoji:'🛒', count:29 },
  { id:'fruits',     name:'Fruits',        emoji:'🍎', count:6  },
  { id:'vegetables', name:'Vegetables',    emoji:'🥦', count:5  },
  { id:'dairy',      name:'Dairy & Eggs',  emoji:'🥛', count:3  },
  { id:'bakery',     name:'Bakery',        emoji:'🍞', count:3  },
  { id:'beverages',  name:'Beverages',     emoji:'🧃', count:4  },
  { id:'snacks',     name:'Snacks',        emoji:'🍪', count:3  },
  { id:'grains',     name:'Rice & Grains', emoji:'🌾', count:3  },
  { id:'care',       name:'Personal Care', emoji:'🧴', count:2  },
];

const PRODUCTS = [
  { id:1,  name:'Fresh Red Apples',        category:'fruits',     emoji:'🍎', price:89,  original:110, discount:19, rating:4.5, reviews:234 },
  { id:2,  name:'Ripe Bananas (6 pcs)',    category:'fruits',     emoji:'🍌', price:45,  original:60,  discount:25, rating:4.3, reviews:189 },
  { id:3,  name:'Fresh Oranges (5 pcs)',   category:'fruits',     emoji:'🍊', price:75,  original:90,  discount:17, rating:4.6, reviews:156 },
  { id:4,  name:'Juicy Mangoes (2 pcs)',   category:'fruits',     emoji:'🥭', price:120, original:150, discount:20, rating:4.8, reviews:312 },
  { id:5,  name:'Fresh Strawberries',      category:'fruits',     emoji:'🍓', price:150, original:180, discount:17, rating:4.7, reviews:98  },
  { id:6,  name:'Blueberries (200g)',      category:'fruits',     emoji:'🫐', price:199, original:249, discount:20, rating:4.4, reviews:67  },
  { id:7,  name:'Fresh Tomatoes (1kg)',    category:'vegetables', emoji:'🍅', price:35,  original:45,  discount:22, rating:4.2, reviews:445 },
  { id:8,  name:'Potatoes (2kg)',          category:'vegetables', emoji:'🥔', price:40,  original:50,  discount:20, rating:4.0, reviews:378 },
  { id:9,  name:'Fresh Spinach (500g)',    category:'vegetables', emoji:'🥬', price:28,  original:35,  discount:20, rating:4.3, reviews:210 },
  { id:10, name:'Baby Carrots (500g)',     category:'vegetables', emoji:'🥕', price:55,  original:70,  discount:21, rating:4.5, reviews:134 },
  { id:11, name:'Broccoli (1 head)',       category:'vegetables', emoji:'🥦', price:65,  original:80,  discount:19, rating:4.4, reviews:89  },
  { id:12, name:'Full Cream Milk (1L)',    category:'dairy',      emoji:'🥛', price:62,  original:75,  discount:17, rating:4.6, reviews:567 },
  { id:13, name:'Amul Butter (500g)',      category:'dairy',      emoji:'🧈', price:240, original:260, discount:8,  rating:4.7, reviews:342 },
  { id:14, name:'Eggs (12 pcs)',           category:'dairy',      emoji:'🥚', price:90,  original:110, discount:18, rating:4.5, reviews:456 },
  { id:15, name:'Whole Wheat Bread',       category:'bakery',     emoji:'🍞', price:45,  original:55,  discount:18, rating:4.3, reviews:289 },
  { id:16, name:'Croissant (4 pcs)',       category:'bakery',     emoji:'🥐', price:120, original:150, discount:20, rating:4.5, reviews:145 },
  { id:17, name:'Multigrain Buns (6 pcs)', category:'bakery',     emoji:'🧁', price:75,  original:90,  discount:17, rating:4.2, reviews:78  },
  { id:18, name:'Orange Juice (1L)',       category:'beverages',  emoji:'🧃', price:99,  original:120, discount:18, rating:4.6, reviews:234 },
  { id:19, name:'Green Tea (25 bags)',     category:'beverages',  emoji:'🍵', price:85,  original:110, discount:23, rating:4.4, reviews:156 },
  { id:20, name:'Coconut Water (500ml)',   category:'beverages',  emoji:'🥥', price:45,  original:55,  discount:18, rating:4.7, reviews:198 },
  { id:21, name:'Mango Juice (1L)',        category:'beverages',  emoji:'🍹', price:79,  original:95,  discount:17, rating:4.3, reviews:112 },
  { id:22, name:'Digestive Biscuits',      category:'snacks',     emoji:'🍪', price:55,  original:65,  discount:15, rating:4.3, reviews:389 },
  { id:23, name:'Mixed Nuts (200g)',       category:'snacks',     emoji:'🥜', price:185, original:220, discount:16, rating:4.6, reviews:167 },
  { id:24, name:'Potato Chips (200g)',     category:'snacks',     emoji:'🫙', price:65,  original:80,  discount:19, rating:4.1, reviews:234 },
  { id:25, name:'Basmati Rice (5kg)',      category:'grains',     emoji:'🌾', price:380, original:450, discount:16, rating:4.7, reviews:445 },
  { id:26, name:'Sunflower Oil (1L)',      category:'grains',     emoji:'🫗', price:145, original:175, discount:17, rating:4.4, reviews:234 },
  { id:27, name:'Whole Wheat Flour (2kg)', category:'grains',     emoji:'🌾', price:89,  original:110, discount:19, rating:4.3, reviews:178 },
  { id:28, name:'Dove Shampoo (400ml)',    category:'care',       emoji:'🧴', price:280, original:330, discount:15, rating:4.5, reviews:123 },
  { id:29, name:'Soap Pack (4 bars)',      category:'care',       emoji:'🧼', price:120, original:140, discount:14, rating:4.4, reviews:89  },
];

const OFFERS = [
  { tag:'Limited Time', title:'20% OFF on Fruits',   desc:'Get fresh seasonal fruits at unbeatable prices!',             emoji:'🍎', gradient:'linear-gradient(135deg,#22c55e,#16a34a)', category:'fruits'     },
  { tag:'Weekend Deal', title:'Buy 1 Get 1 Free',    desc:'On selected dairy products — grab them before they run out!', emoji:'🥛', gradient:'linear-gradient(135deg,#f97316,#ea580c)', category:'dairy'      },
  { tag:'Always On',   title:'Free Delivery',        desc:'On all orders above Rs.499. No minimum hassle!',              emoji:'🚚', gradient:'linear-gradient(135deg,#3b82f6,#2563eb)', category:'all'        },
  { tag:'Flash Deal',  title:'30% OFF Bakery',       desc:'Freshly baked breads, buns & croissants today!',              emoji:'🍞', gradient:'linear-gradient(135deg,#eab308,#ca8a04)', category:'bakery'     },
  { tag:'New Arrival', title:'Fresh Beverages',      desc:'Cold drinks and juices at special introductory prices.',       emoji:'🧃', gradient:'linear-gradient(135deg,#8b5cf6,#7c3aed)', category:'beverages'  },
  { tag:'Bulk Save',   title:'Grains & Rice Offer',  desc:'Buy in bulk and save up to 25% on rice & grains.',            emoji:'🌾', gradient:'linear-gradient(135deg,#ec4899,#db2777)', category:'grains'     },
];

const DELIVERY_FREE_ABOVE = 499;
const DELIVERY_FEE = 40;

// ===========================================
// STATE
// ===========================================
let cart          = [];
let orders        = [];
let currentUser   = null;
let wishlist      = new Set();
let currentFilter = 'all';
let currentSearch = '';
let currentSort   = 'default';
let currentLoc    = { city: 'Chennai', pin: '600001' };

// ===========================================
// LOCAL STORAGE
// ===========================================
const ls = {
  save: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  load: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
};
function saveCart()     { ls.save('fc_cart', cart); }
function loadCart()     { cart = ls.load('fc_cart', []); }
function saveOrders()   { ls.save('fc_orders', orders); }
function loadOrders()   { orders = ls.load('fc_orders', []); }
function saveUser(u)    { ls.save('fc_user', u); }
function loadUser()     { currentUser = ls.load('fc_user', null); }
function saveWishlist() { ls.save('fc_wish', [...wishlist]); }
function loadWishlist() { wishlist = new Set(ls.load('fc_wish', [])); }
function saveLocation() { ls.save('fc_loc', currentLoc); }
function loadLocation() {
  currentLoc = ls.load('fc_loc', { city: 'Chennai', pin: '600001' });
  // Reset if old non-Tamil Nadu location stored
  if (['Mumbai','Delhi','Bengaluru','Hyderabad','Pune','Kolkata','Ahmedabad'].some(c => currentLoc.city.includes(c))) {
    currentLoc = { city: 'Chennai', pin: '600001' };
    saveLocation();
  }
}

// ===========================================
// TOAST NOTIFICATIONS
// ===========================================
let _toastTimer;
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.className = 'toast'; }, 3200);
}

// ===========================================
// HEADER & STICKY SCROLL
// ===========================================
function initHeader() {
  const h = document.getElementById('header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.classList.toggle('scrolled', window.scrollY > 15);
  }, { passive: true });
}

// ===========================================
// ANIMATED SEARCH PLACEHOLDER TYPING
// ===========================================
const SEARCH_SUGGESTIONS = [
  "Search 'fresh milk'...",
  "Search 'alphonso mangoes'...",
  "Search 'whole wheat bread'...",
  "Search 'farm spinach'...",
  "Search 'butter & eggs'...",
  "Search 'potato chips'...",
  "Search 'dove shampoo'..."
];

function initAnimatedSearchPlaceholder() {
  const input = document.getElementById('headerSearch');
  if (!input) return;

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let timeoutId = null;

  function typeTick() {
    if (document.activeElement === input || input.value.length > 0) {
      timeoutId = setTimeout(typeTick, 1000);
      return;
    }
    const cur = SEARCH_SUGGESTIONS[phraseIdx];
    if (isDeleting) {
      charIdx--;
      input.setAttribute('placeholder', cur.substring(0, charIdx));
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % SEARCH_SUGGESTIONS.length;
        timeoutId = setTimeout(typeTick, 400);
        return;
      }
      timeoutId = setTimeout(typeTick, 45);
    } else {
      charIdx++;
      input.setAttribute('placeholder', cur.substring(0, charIdx));
      if (charIdx >= cur.length) {
        isDeleting = true;
        timeoutId = setTimeout(typeTick, 2000);
        return;
      }
      timeoutId = setTimeout(typeTick, 80);
    }
  }

  typeTick();
}

// ===========================================
// SMART SEARCH WITH LIVE DROPDOWN
// ===========================================
function initSearch() {
  const isProducts = document.body.dataset.page === 'products';
  const hi = document.getElementById('headerSearch');
  const sb = document.getElementById('searchBtn');
  const clr = document.getElementById('searchClearBtn');
  const dd = document.getElementById('searchSuggestionsDropdown');
  const sugList = document.getElementById('suggestionsList');
  const viewAll = document.getElementById('viewAllResultsLink');

  function doSearch(val) {
    const q = val.trim();
    if (dd) dd.hidden = true;
    if (isProducts) {
      currentSearch = q.toLowerCase();
      const url = new URL(window.location.href);
      if (q) url.searchParams.set('search', q);
      else url.searchParams.delete('search');
      history.replaceState({}, '', url);
      renderProducts();
    } else {
      if (q) window.location.href = `products.html?search=${encodeURIComponent(q)}`;
      else window.location.href = 'products.html';
    }
  }

  function updateLiveSuggestions(query) {
    const q = query.trim().toLowerCase();
    if (!dd || !sugList) return;

    if (q.length === 0) {
      dd.hidden = true;
      if (clr) clr.hidden = true;
      return;
    }

    if (clr) clr.hidden = false;

    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) {
      sugList.innerHTML = `<div style="padding:16px;text-align:center;color:#64748b;font-size:0.85rem;">No products match "${query}"</div>`;
    } else {
      sugList.innerHTML = matches.map(p => `
        <div class="suggestion-item" data-id="${p.id}">
          <span class="sug-emoji">${p.emoji}</span>
          <div class="sug-info">
            <div class="sug-name">${p.name}</div>
            <div class="sug-cat">${getCatName(p.category)} &bull; <strong style="color:var(--primary-dark)">Rs.${p.price}</strong></div>
          </div>
          <button class="sug-add-btn" data-sug-add="${p.id}">+ Add</button>
        </div>
      `).join('');

      sugList.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.closest('[data-sug-add]')) return;
          const pid = item.dataset.id;
          const prod = PRODUCTS.find(x => x.id === +pid);
          if (prod) doSearch(prod.name);
        });
      });

      sugList.querySelectorAll('[data-sug-add]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const pid = +btn.dataset.sugAdd;
          addToCart(pid);
          btn.textContent = '✓ Added';
          setTimeout(() => { btn.textContent = '+ Add'; }, 1000);
        });
      });
    }

    if (viewAll) {
      viewAll.href = `products.html?search=${encodeURIComponent(query)}`;
      viewAll.textContent = `View all results for "${query}" →`;
    }
    dd.hidden = false;
  }

  if (hi) {
    hi.addEventListener('input', e => updateLiveSuggestions(e.target.value));
    hi.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch(hi.value);
      if (e.key === 'Escape' && dd) dd.hidden = true;
    });
    if (sb) sb.addEventListener('click', () => doSearch(hi.value));
  }

  if (clr) {
    clr.addEventListener('click', () => {
      if (hi) hi.value = '';
      clr.hidden = true;
      if (dd) dd.hidden = true;
      if (isProducts) {
        currentSearch = '';
        renderProducts();
      }
    });
  }

  // Close live suggestions on click outside
  document.addEventListener('click', e => {
    if (dd && !e.target.closest('.search-wrapper')) {
      dd.hidden = true;
    }
  });

  // Mobile search
  const mi = document.getElementById('mobileSearch');
  const mb = document.getElementById('mobileSearchBtn');
  if (mi) {
    mi.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(mi.value); });
    if (mb) mb.addEventListener('click', () => doSearch(mi.value));
  }

  const clearBtn = document.getElementById('clearSearchBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentSearch = '';
      if (hi) hi.value = '';
      if (mi) mi.value = '';
      if (clr) clr.hidden = true;
      const url = new URL(window.location.href);
      url.searchParams.delete('search');
      history.replaceState({}, '', url);
      renderProducts();
    });
  }

  initAnimatedSearchPlaceholder();
}

// ===========================================
// LOCATION SELECTOR MODAL & LOGIC
// ===========================================
function initLocationSelector() {
  loadLocation();
  updateLocationDisplay();

  const locModal = document.getElementById('locationModal');
  const locOverlay = document.getElementById('locationOverlay');
  const closeLoc = document.getElementById('closeLocationModal');

  function openLocationModal() {
    openModal('locationModal', 'locationOverlay');
  }

  ['topLocationBtn', 'headerLocationBtn', 'mobileChangeLocBtn', 'footerChangeLoc', 'menuLocationBtn', 'changeLocationFromOrders'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pm = document.getElementById('profileMenu');
      if (pm) pm.hidden = true;
      openLocationModal();
    });
  });

  if (closeLoc) closeLoc.addEventListener('click', () => closeModal('locationModal', 'locationOverlay'));
  if (locOverlay) locOverlay.addEventListener('click', () => closeModal('locationModal', 'locationOverlay'));

  // City chips
  document.querySelectorAll('.city-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.city-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentLoc = { city: chip.dataset.city, pin: chip.dataset.pin };
      saveLocation();
      updateLocationDisplay();
      closeModal('locationModal', 'locationOverlay');
      showToast(`Delivering to ${currentLoc.city} (${currentLoc.pin}) in 15 mins! ⚡`, 'success');
    });
  });

  // Apply custom pincode
  const applyBtn = document.getElementById('applyPincodeBtn');
  const pinInput = document.getElementById('locPincodeInput');
  if (applyBtn && pinInput) {
    applyBtn.addEventListener('click', () => {
      const v = pinInput.value.trim();
      if (!v) { showToast('Please enter a city or pincode', 'error'); return; }
      currentLoc = { city: v, pin: '' };
      saveLocation();
      updateLocationDisplay();
      closeModal('locationModal', 'locationOverlay');
      showToast(`Delivery location set to: ${v} 📍`, 'success');
    });
    pinInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyBtn.click(); });
  }

  // GPS auto-detect
  const gpsBtn = document.getElementById('detectLocationBtn');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      gpsBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Detecting location...';
      setTimeout(() => {
        gpsBtn.innerHTML = '<i class="fa fa-crosshairs"></i> Use Current Location (Auto-Detect)';
        currentLoc = { city: 'Anna Nagar, Chennai', pin: '600040' };
        saveLocation();
        updateLocationDisplay();
        closeModal('locationModal', 'locationOverlay');
        showToast('Location auto-detected: Anna Nagar, Chennai (600040)! 🎯', 'success');
      }, 700);
    });
  }
}

function updateLocationDisplay() {
  const txt = `${currentLoc.city}${currentLoc.pin ? ' ' + currentLoc.pin : ''}`;
  const cName = document.getElementById('currentLocationName');
  const tText = document.getElementById('topLocationText');
  const mText = document.getElementById('mobileLocText');
  const chkCity = document.getElementById('chkCity');
  const chkPin = document.getElementById('chkPincode');
  const oLoc = document.getElementById('ordersPageLocation');

  if (cName) cName.innerHTML = `${txt} <i class="fa fa-chevron-down"></i>`;
  if (tText) tText.innerHTML = `Deliver to: <strong>${txt}</strong>`;
  if (mText) mText.textContent = `${txt} (15 Mins)`;
  if (oLoc) oLoc.textContent = txt;
  if (chkCity && currentLoc.city) chkCity.value = currentLoc.city.split(',')[0].trim();
  if (chkPin && currentLoc.pin) chkPin.value = currentLoc.pin;
}

// ===========================================
// PROFILE MENU DROPDOWN
// ===========================================
function initProfileMenu() {
  const profBtn = document.getElementById('profileBtn');
  const menu = document.getElementById('profileMenu');
  const authBtn = document.getElementById('menuAuthBtn');

  if (!profBtn || !menu) return;

  profBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.hidden = !menu.hidden;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-dropdown-wrapper')) {
      menu.hidden = true;
    }
  });

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      menu.hidden = true;
      if (currentUser) {
        if (confirm(`Logged in as ${currentUser.name}.\n\nClick OK to log out.`)) {
          currentUser = null;
          localStorage.removeItem('fc_user');
          updateProfileUI();
          showToast('Logged out successfully', 'info');
        }
      } else {
        openModal('loginModal', 'loginOverlay');
      }
    });
  }
}

// ===========================================
// MOBILE NAVIGATION
// ===========================================
function initMobileNav() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = !nav.hidden;
    btn.classList.toggle('open', !open);
    btn.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { nav.hidden = true; btn.classList.remove('open'); });
  });

  const mobCartBtn = document.getElementById('mobileBottomCartBtn');
  if (mobCartBtn) {
    mobCartBtn.addEventListener('click', openCart);
  }
}

// ===========================================
// HELPERS
// ===========================================
function getStars(r) {
  const f = Math.floor(r), h = r % 1 >= 0.5 ? 1 : 0, e = 5 - f - h;
  return '★'.repeat(f) + (h ? '½' : '') + '☆'.repeat(e);
}
function getCartQty(id) { return cart.find(c => c.id === id)?.qty ?? 0; }
function getCatName(id) { return CATEGORIES.find(c => c.id === id)?.name || id; }

// ===========================================
// PRODUCT CARD RENDERER
// ===========================================
function renderProductCard(p) {
  const qty = getCartQty(p.id);
  const wished = wishlist.has(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-image-wrap">
      ${p.discount ? `<span class="product-badge">${p.discount}% OFF</span>` : ''}
      <span class="product-emoji">${p.emoji}</span>
      <button class="product-wishlist${wished ? ' liked' : ''}" data-wish="${p.id}" aria-label="Wishlist">
        <i class="fa${wished ? '' : 'r'} fa-heart"></i>
      </button>
    </div>
    <div class="product-info">
      <div class="product-category">${getCatName(p.category)}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-rating">
        <span class="stars">${getStars(p.rating)}</span>
        <span class="rating-value">${p.rating} (${p.reviews})</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">Rs.${p.price}</span>
        ${p.original ? `<span class="product-original">Rs.${p.original}</span>` : ''}
        ${p.discount ? `<span class="product-discount">${p.discount}% OFF</span>` : ''}
      </div>
      ${qty === 0
        ? `<button class="btn-add-cart" data-add="${p.id}"><i class="fa fa-plus"></i> Add to Cart</button>`
        : `<div class="qty-stepper">
             <button class="qty-btn" data-dec="${p.id}">-</button>
             <span class="qty-display">${qty}</span>
             <button class="qty-btn" data-inc="${p.id}">+</button>
           </div>`
      }
    </div>
  </div>`;
}

function attachCardEvents(container) {
  container.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => addToCart(+b.dataset.add)));
  container.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => updateCartQty(+b.dataset.inc, 1)));
  container.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => updateCartQty(+b.dataset.dec, -1)));
  container.querySelectorAll('[data-wish]').forEach(b => b.addEventListener('click', () => toggleWishlist(+b.dataset.wish)));
}

// ===========================================
// CART MANAGEMENT
// ===========================================
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id); if (!p) return;
  const ex = cart.find(c => c.id === id);
  if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
  saveCart(); updateCartUI(); rerenderCurrentPageCards();
  showToast(`${p.name} added to cart! 🛒`, 'success');
  bumpBadge();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart(); updateCartUI(); rerenderCurrentPageCards(); renderCheckoutSummary();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id); if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); rerenderCurrentPageCards(); renderCheckoutSummary(); }
}

function rerenderCurrentPageCards() {
  const page = document.body.dataset.page;
  if (page === 'home') renderHomeRecommendations();
  else if (page === 'products') renderProducts();
  else if (page === 'offers') renderOfferProducts();
}

function bumpBadge() {
  const b = document.getElementById('cartBadge');
  if (!b) return;
  b.classList.add('bump');
  setTimeout(() => b.classList.remove('bump'), 300);
}

function getCartTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= DELIVERY_FREE_ABOVE || subtotal === 0 ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}

function updateCartUI() {
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const { subtotal, delivery, total } = getCartTotals();

  // Badges
  ['cartBadge', 'cartCount', 'mobileCartBadge'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = totalQty;
  });

  // Header Cart Pill Total
  const headerTotal = document.getElementById('headerCartTotal');
  if (headerTotal) headerTotal.textContent = `Rs.${total}`;

  // Wishlist badge
  const wishBadge = document.getElementById('wishlistBadge');
  if (wishBadge) wishBadge.textContent = wishlist.size;

  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  const empty  = document.getElementById('cartEmpty');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = '';
    if (footer) footer.hidden = true;
    if (empty)  empty.hidden  = false;
    return;
  }
  if (empty)  empty.hidden  = true;
  if (footer) footer.hidden = false;

  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">Rs.${item.price} each</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-total">Rs.${item.price * item.qty}</div>
        <div class="cart-item-stepper">
          <button class="cart-qty-btn" data-cart-dec="${item.id}">-</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" data-cart-inc="${item.id}">+</button>
        </div>
        <button class="btn-remove" data-cart-rm="${item.id}"><i class="fa fa-trash"></i> Remove</button>
      </div>
    </div>`).join('');

  body.querySelectorAll('[data-cart-inc]').forEach(b => b.addEventListener('click', () => updateCartQty(+b.dataset.cartInc, 1)));
  body.querySelectorAll('[data-cart-dec]').forEach(b => b.addEventListener('click', () => updateCartQty(+b.dataset.cartDec, -1)));
  body.querySelectorAll('[data-cart-rm]' ).forEach(b => b.addEventListener('click', () => removeFromCart(+b.dataset.cartRm)));

  const sub = document.getElementById('cartSubtotal');
  const del = document.getElementById('deliveryFee');
  const tot = document.getElementById('cartTotal');
  if (sub) sub.textContent = `Rs.${subtotal}`;
  if (del) del.textContent = delivery === 0 ? 'FREE' : `Rs.${delivery}`;
  if (tot) tot.innerHTML   = `<strong>Rs.${total}</strong>`;
}

// ===========================================
// CART SIDEBAR
// ===========================================
function initCartSidebar() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const btn     = document.getElementById('cartBtn');
  const close   = document.getElementById('closeCart');
  const start   = document.getElementById('startShoppingBtn');
  const chkBtn  = document.getElementById('checkoutBtn');
  if (!sidebar) return;

  if (btn)    btn.addEventListener('click', openCart);
  if (close)  close.addEventListener('click', closeCart);
  if (overlay)overlay.addEventListener('click', closeCart);
  if (start)  start.addEventListener('click', () => { closeCart(); window.location.href = 'products.html'; });
  if (chkBtn) chkBtn.addEventListener('click', () => { closeCart(); openCheckout(); });
}

function openCart() {
  const s = document.getElementById('cartSidebar');
  const o = document.getElementById('cartOverlay');
  if (!s) return;
  s.hidden = false;
  if (o) o.classList.add('active');
  requestAnimationFrame(() => s.classList.add('open'));
  updateCartUI();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const s = document.getElementById('cartSidebar');
  const o = document.getElementById('cartOverlay');
  if (!s) return;
  s.classList.remove('open');
  if (o) o.classList.remove('active');
  setTimeout(() => { s.hidden = true; }, 350);
  document.body.style.overflow = '';
}

// ===========================================
// AUTH
// ===========================================
function initAuth() {
  updateProfileUI();

  const closeLogin = document.getElementById('closeLogin');
  const loginOverlay = document.getElementById('loginOverlay');
  if (closeLogin)   closeLogin.addEventListener('click',   () => closeModal('loginModal', 'loginOverlay'));
  if (loginOverlay) loginOverlay.addEventListener('click', () => closeModal('loginModal', 'loginOverlay'));

  const loginTab    = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  if (loginTab)    loginTab.addEventListener('click',    () => switchAuthTab('login'));
  if (registerTab) registerTab.addEventListener('click', () => switchAuthTab('register'));

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPassword').value;
    const users = ls.load('fc_users', []);
    const user  = users.find(u => u.email === email && u.password === pass);
    if (user) {
      loginSuccess(user);
    } else {
      showToast('Invalid credentials. Please register first.', 'error');
    }
  });

  const regForm = document.getElementById('registerForm');
  if (regForm) regForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass  = document.getElementById('regPassword').value;
    if (!name || !email || !pass) { showToast('Please fill all fields', 'error'); return; }
    if (pass.length < 6)          { showToast('Password min 6 chars', 'error'); return; }
    const users = ls.load('fc_users', []);
    if (users.find(u => u.email === email)) { showToast('Email already registered', 'error'); return; }
    const u = { name, email, password: pass };
    users.push(u);
    ls.save('fc_users', users);
    loginSuccess(u);
    showToast(`Welcome, ${name}! 🎉`, 'success');
  });
}

function switchAuthTab(tab) {
  const lf = document.getElementById('loginForm');
  const rf = document.getElementById('registerForm');
  const lt = document.getElementById('loginTab');
  const rt = document.getElementById('registerTab');
  const title = document.getElementById('authModalTitle');
  if (lf) lf.hidden = tab !== 'login';
  if (rf) rf.hidden = tab !== 'register';
  if (lt) lt.classList.toggle('active', tab === 'login');
  if (rt) rt.classList.toggle('active', tab === 'register');
  if (title) title.innerHTML = tab === 'login'
    ? '<i class="fa fa-user-circle"></i> Welcome Back'
    : '<i class="fa fa-user-plus"></i> Create Account';
}

function loginSuccess(user) {
  currentUser = user;
  saveUser(user);
  updateProfileUI();
  closeModal('loginModal', 'loginOverlay');
  showToast(`Welcome back, ${user.name}! 👋`, 'success');
}

function updateProfileUI() {
  const label = document.getElementById('profileLabel');
  const menuHeader = document.getElementById('profileMenuHeader');
  const menuAuthBtn = document.getElementById('menuAuthBtn');

  if (currentUser) {
    const first = currentUser.name.split(' ')[0];
    if (label) label.textContent = first;
    if (menuHeader) menuHeader.innerHTML = `<strong>Hi, ${currentUser.name}!</strong><small>${currentUser.email}</small>`;
    if (menuAuthBtn) menuAuthBtn.innerHTML = `<i class="fa fa-sign-out-alt"></i> Logout`;
  } else {
    if (label) label.textContent = 'Login';
    if (menuHeader) menuHeader.innerHTML = `<strong>Welcome to FreshCart!</strong><small>Login to access your orders</small>`;
    if (menuAuthBtn) menuAuthBtn.innerHTML = `<i class="fa fa-sign-in-alt"></i> Login / Register`;
  }
}

// ===========================================
// MODALS LOGIC
// ===========================================
function openModal(mId, oId) {
  const m = document.getElementById(mId);
  const o = document.getElementById(oId);
  if (m) m.hidden = false;
  if (o) o.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(mId, oId) {
  const m = document.getElementById(mId);
  const o = document.getElementById(oId);
  if (m) m.hidden = true;
  if (o) o.hidden = true;
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal('loginModal',    'loginOverlay');
    closeModal('checkoutModal', 'checkoutOverlay');
    closeModal('confirmModal',  'confirmOverlay');
    closeModal('trackModal',    'trackOverlay');
    closeModal('cancelModal',   'cancelOverlay');
    closeModal('locationModal', 'locationOverlay');
    const dd = document.getElementById('searchSuggestionsDropdown');
    if (dd) dd.hidden = true;
    const pm = document.getElementById('profileMenu');
    if (pm) pm.hidden = true;
    closeCart();
  }
});

// ===========================================
// CHECKOUT & ORDERS
// ===========================================
function initCheckout() {
  const chkClose = document.getElementById('closeCheckout');
  const chkOvl   = document.getElementById('checkoutOverlay');
  if (chkClose) chkClose.addEventListener('click', () => closeModal('checkoutModal','checkoutOverlay'));
  if (chkOvl)   chkOvl.addEventListener('click',   () => closeModal('checkoutModal','checkoutOverlay'));

  const form = document.getElementById('checkoutForm');
  if (form) form.addEventListener('submit', handleCheckoutSubmit);
}

function openCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
  renderCheckoutSummary();
  if (currentUser) {
    const n = document.getElementById('chkName'); if (n) n.value = currentUser.name;
  }
  openModal('checkoutModal', 'checkoutOverlay');
}

function renderCheckoutSummary() {
  const list = document.getElementById('checkoutItemsList'); if (!list) return;
  const { subtotal, delivery, total } = getCartTotals();
  list.innerHTML = cart.map(i => `
    <div class="checkout-item">
      <span class="checkout-item-emoji">${i.emoji}</span>
      <div class="checkout-item-name">${i.name}</div>
      <div class="checkout-item-qty">x${i.qty}</div>
      <div class="checkout-item-price">Rs.${i.price * i.qty}</div>
    </div>`).join('');
  const s = document.getElementById('chkSubtotal');
  const d = document.getElementById('chkDelivery');
  const t = document.getElementById('chkTotal');
  if (s) s.textContent = `Rs.${subtotal}`;
  if (d) d.textContent = delivery === 0 ? 'FREE' : `Rs.${delivery}`;
  if (t) t.innerHTML   = `<strong>Rs.${total}</strong>`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const { subtotal, delivery, total } = getCartTotals();
  const pmEl = form.querySelector('input[name="payMethod"]:checked');
  const pv   = pmEl ? pmEl.value : 'cod';
  const pm   = { cod:'Cash on Delivery', upi:'UPI Payment', card:'Card Payment' }[pv] || pv;
  const now  = new Date();

  const order = {
    id:       'FC' + Math.floor(10000 + Math.random() * 90000),
    date:     now.toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    time:     now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
    items:    [...cart],
    subtotal, delivery, total,
    payment:  pm,
    address:  `${document.getElementById('chkAddress').value.trim()}, ${document.getElementById('chkCity').value.trim()} - ${document.getElementById('chkPincode').value.trim()}`,
    name:     document.getElementById('chkName').value.trim(),
    phone:    document.getElementById('chkPhone').value.trim(),
    status:   'processing',
    trackStep: 1,
  };

  orders.unshift(order);
  saveOrders();
  cart = []; saveCart(); updateCartUI(); rerenderCurrentPageCards();
  closeModal('checkoutModal','checkoutOverlay');
  showOrderConfirmation(order);
}

function showOrderConfirmation(order) {
  const det = document.getElementById('confirmDetails'); if (!det) return;
  det.innerHTML = `
    <div class="confirm-detail-item"><strong>Order ID</strong><span>${order.id}</span></div>
    <div class="confirm-detail-item"><strong>Date &amp; Time</strong><span>${order.date}, ${order.time}</span></div>
    <div class="confirm-detail-item"><strong>Total Amount</strong><span>Rs.${order.total}</span></div>
    <div class="confirm-detail-item"><strong>Payment</strong><span>${order.payment}</span></div>
    <div class="confirm-detail-item"><strong>Delivery Address</strong><span>${order.address}</span></div>
    <div class="confirm-detail-item"><strong>Est. Arrival</strong><span>15-30 minutes</span></div>`;

  // Reset steps
  ['step-confirmed','step-packed','step-delivery','step-delivered'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.className = 'track-step' + (i === 0 ? ' completed' : '');
  });
  ['connector-1','connector-2','connector-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.className = 'track-connector';
  });

  openModal('confirmModal','confirmOverlay');
  animateTracking();
}

function animateTracking() {
  const steps = ['step-packed','step-delivery','step-delivered'];
  const conns = ['connector-1','connector-2','connector-3'];
  let i = 0;
  const iv = setInterval(() => {
    if (i >= steps.length) { clearInterval(iv); return; }
    const conn = document.getElementById(conns[i]);
    if (conn) conn.classList.add('done');
    const step = document.getElementById(steps[i]);
    if (step) {
      step.classList.add('active');
      setTimeout(() => { if (step) { step.classList.remove('active'); step.classList.add('completed'); } }, 1800);
    }
    i++;
  }, 2200);
}

function initConfirmModal() {
  const cont = document.getElementById('continueShoppingBtn');
  const ovl  = document.getElementById('confirmOverlay');
  if (cont) cont.addEventListener('click', () => { closeModal('confirmModal','confirmOverlay'); window.location.href = 'products.html'; });
  if (ovl)  ovl.addEventListener('click',  () => closeModal('confirmModal','confirmOverlay'));
}

function initTrackModal() {
  const close = document.getElementById('closeTrack');
  const ovl   = document.getElementById('trackOverlay');
  if (close) close.addEventListener('click', () => closeModal('trackModal','trackOverlay'));
  if (ovl)   ovl.addEventListener('click',   () => closeModal('trackModal','trackOverlay'));
}

function openTrackModal(orderId) {
  const order = orders.find(o => String(o.id) === String(orderId) || String(o.order_code) === String(orderId));
  if (!order) return;
  const isCancelled = order.status === 'cancelled';
  const canCancel   = order.status !== 'delivered' && !isCancelled;
  const stepNames   = ['Order Confirmed','Order Packed','Out for Delivery','Delivered'];
  const stepIcons   = ['fa-check-circle','fa-box','fa-motorcycle','fa-home'];
  const stepDescs   = ['Your order has been received','Items are packed in eco-bag','Rider on the way to you','Enjoy your fresh groceries!'];
  const completed   = isCancelled ? 0 : (order.trackStep ?? (order.track_step ?? 1));

  const stepsHtml = stepNames.map((name, i) => {
    const done   = !isCancelled && i < completed;
    const active = !isCancelled && i === completed;
    return `${i > 0 ? `<div class="track-connector${done ? ' done' : ''}"></div>` : ''}
      <div class="track-step${done ? ' completed' : active ? ' active' : ''}" style="${isCancelled ? 'opacity: 0.45;' : ''}">
        <div class="track-icon"><i class="fa ${stepIcons[i]}"></i></div>
        <div class="track-info"><strong>${name}</strong><span>${stepDescs[i]}</span></div>
      </div>`;
  }).join('');

  const body = document.getElementById('trackModalBody'); if (!body) return;
  const oidDisplay = order.id || order.order_code;
  const sCls = order.status === 'delivered' ? 'status-delivered' : isCancelled ? 'status-cancelled' : 'status-processing';
  const sLabel = order.status === 'delivered' ? 'Delivered' : isCancelled ? 'Cancelled' : 'Processing';

  body.innerHTML = `
    ${isCancelled ? `
      <div class="tracking-cancelled-banner">
        <i class="fa fa-times-circle"></i>
        <div>
          <strong>This order was cancelled</strong>
          <p>${order.cancelReason || 'Order was cancelled by customer. Product stock was restored.'}</p>
        </div>
      </div>` : ''}
    <div class="confirm-details" style="margin-bottom:20px">
      <div class="confirm-detail-item"><strong>Order ID</strong><span>${oidDisplay}</span></div>
      <div class="confirm-detail-item"><strong>Date</strong><span>${order.date || ''}</span></div>
      <div class="confirm-detail-item"><strong>Total</strong><span>Rs.${order.total}</span></div>
      <div class="confirm-detail-item"><strong>Status</strong><span class="order-status ${sCls}">${sLabel}</span></div>
    </div>
    <div class="tracking-steps">${stepsHtml}</div>
    ${canCancel ? `
      <button class="btn-modal-cancel" data-cancel-oid="${oidDisplay}">
        <i class="fa fa-ban"></i> Cancel This Order
      </button>` : ''}`;

  const cancelBtn = body.querySelector('[data-cancel-oid]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      closeModal('trackModal', 'trackOverlay');
      openCancelModal(cancelBtn.dataset.cancelOid);
    });
  }

  openModal('trackModal','trackOverlay');
}

// ===========================================
// CANCEL ORDER MODAL LOGIC
// ===========================================
function openCancelModal(orderId) {
  const order = orders.find(o => String(o.id) === String(orderId) || String(o.order_code) === String(orderId));
  if (!order) return;

  const idEl = document.getElementById('cancelModalOrderId');
  const targetInput = document.getElementById('cancelTargetOrderId');
  const notes = document.getElementById('cancelAdditionalNotes');

  const displayId = order.id || order.order_code;
  if (idEl) idEl.textContent = '#' + displayId;
  if (targetInput) targetInput.value = displayId;
  if (notes) notes.value = '';

  const firstRadio = document.querySelector('input[name="cancelReason"]');
  if (firstRadio) firstRadio.checked = true;

  openModal('cancelModal', 'cancelOverlay');
}

function initCancelModal() {
  const closeBtn = document.getElementById('closeCancelModal');
  const abortBtn = document.getElementById('abortCancelBtn');
  const overlay  = document.getElementById('cancelOverlay');
  const form     = document.getElementById('cancelOrderForm');

  const closeCancel = () => closeModal('cancelModal', 'cancelOverlay');

  if (closeBtn) closeBtn.addEventListener('click', closeCancel);
  if (abortBtn) abortBtn.addEventListener('click', closeCancel);
  if (overlay)  overlay.addEventListener('click',  closeCancel);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const targetId = document.getElementById('cancelTargetOrderId')?.value;
      if (!targetId) return;

      const submitBtn = document.getElementById('confirmCancelSubmitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Cancelling...';
      }

      const selectedReason = form.querySelector('input[name="cancelReason"]:checked')?.value || 'Cancelled by customer';
      const notes = document.getElementById('cancelAdditionalNotes')?.value?.trim();
      const fullReason = notes ? `${selectedReason} (${notes})` : selectedReason;

      const order = orders.find(o => String(o.id) === String(targetId) || String(o.order_code) === String(targetId));
      if (order) {
        order.status = 'cancelled';
        order.trackStep = 0;
        order.cancelReason = fullReason;
        saveOrders();
      }

      // If online and using backend API
      if (typeof API !== 'undefined' && API.isLoggedIn && API.isLoggedIn()) {
        try {
          await API.orders.cancel(targetId, fullReason);
        } catch (err) {
          console.warn('API cancel sync note:', err.message);
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa fa-ban"></i> Confirm Cancellation';
      }

      closeCancel();
      showToast(`Order #${targetId} cancelled successfully`, 'info');
      renderOrdersList();
    });
  }
}

// ===========================================
// WISHLIST
// ===========================================
function toggleWishlist(id) {
  if (wishlist.has(id)) { wishlist.delete(id); showToast('Removed from wishlist', 'info'); }
  else                  { wishlist.add(id);    showToast('Added to wishlist ❤️', 'success'); }
  saveWishlist();
  updateCartUI();
  rerenderCurrentPageCards();
}

// ===========================================
// PAGE: HOME
// ===========================================
function initHomePage() {
  renderHomeCategoriesGrid();
  renderHomeRecommendations();
}

function renderHomeCategoriesGrid() {
  const grid = document.getElementById('homeCategoriesGrid'); if (!grid) return;
  grid.innerHTML = CATEGORIES.filter(c => c.id !== 'all').map(cat => `
    <a href="products.html?cat=${cat.id}" class="category-card" aria-label="${cat.name}">
      <span class="category-emoji">${cat.emoji}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} items</div>
    </a>`).join('');
}

function renderHomeRecommendations() {
  const grid = document.getElementById('recommendationsGrid'); if (!grid) return;
  const subtitle = document.getElementById('recommendationSubtitle');
  let recs = [];
  let txt  = 'Based on popular purchases';

  if (cart.length > 0) {
    const cats = [...new Set(cart.map(c => c.category))];
    txt  = `Because you added ${getCatName(cats[0])} to your cart`;
    recs = PRODUCTS.filter(p => cats.includes(p.category) && !cart.some(c => c.id === p.id));
  }
  if (recs.length < 6) {
    const top = [...PRODUCTS].sort((a,b) => b.rating - a.rating);
    const ex  = new Set(recs.map(p => p.id));
    top.forEach(p => { if (!ex.has(p.id) && recs.length < 6) recs.push(p); });
  }
  if (subtitle) subtitle.textContent = txt;
  grid.innerHTML = recs.map(renderProductCard).join('');
  attachCardEvents(grid);
}

// ===========================================
// PAGE: CATEGORIES
// ===========================================
function initCategoriesPage() {
  const grid = document.getElementById('categoriesGrid'); if (!grid) return;
  grid.innerHTML = CATEGORIES.filter(c => c.id !== 'all').map(cat => `
    <a href="products.html?cat=${cat.id}" class="category-card" aria-label="${cat.name}">
      <span class="category-emoji">${cat.emoji}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} items</div>
    </a>`).join('');
}

// ===========================================
// PAGE: PRODUCTS
// ===========================================
function initProductsPage() {
  const params = new URLSearchParams(window.location.search);
  const catParam    = params.get('cat')    || 'all';
  const searchParam = params.get('search') || '';
  const filterParam = params.get('filter') || '';

  currentFilter = catParam;
  currentSearch = searchParam.toLowerCase();

  if (searchParam) {
    const hi = document.getElementById('headerSearch');
    const mi = document.getElementById('mobileSearch');
    if (hi) hi.value = searchParam;
    if (mi) mi.value = searchParam;
  }

  const sub = document.getElementById('productsSubtitle');
  if (sub) {
    if (filterParam === 'wishlist') {
      sub.textContent = `Showing your saved wishlist items ❤️`;
    } else if (catParam !== 'all') {
      sub.textContent = `Showing fresh ${getCatName(catParam)} products`;
    } else if (searchParam) {
      sub.textContent = `Search results for "${searchParam}"`;
    }
  }

  const sortSel = document.getElementById('sortSelect');
  if (sortSel) sortSel.addEventListener('change', e => {
    currentSort = e.target.value;
    renderProducts();
  });

  renderFilterTabs();
  renderProducts(filterParam === 'wishlist');
}

function renderFilterTabs() {
  const container = document.getElementById('filterTabs'); if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-tab${cat.id === currentFilter ? ' active' : ''}"
      data-cat="${cat.id}" role="tab" aria-selected="${cat.id === currentFilter}">
      ${cat.emoji} ${cat.name}
    </button>`).join('');

  container.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.cat;
      currentSearch = '';
      const hi = document.getElementById('headerSearch');
      const mi = document.getElementById('mobileSearch');
      if (hi) hi.value = '';
      if (mi) mi.value = '';
      const url = new URL(window.location.href);
      if (currentFilter === 'all') url.searchParams.delete('cat');
      else url.searchParams.set('cat', currentFilter);
      url.searchParams.delete('search');
      url.searchParams.delete('filter');
      history.replaceState({}, '', url);
      renderFilterTabs();
      renderProducts();
    });
  });
}

function renderProducts(wishlistOnly = false) {
  const grid  = document.getElementById('productsGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;

  let list = [...PRODUCTS];
  if (wishlistOnly) list = list.filter(p => wishlist.has(p.id));
  else if (currentFilter !== 'all') list = list.filter(p => p.category === currentFilter);

  if (currentSearch) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.includes(currentSearch)
    );
  }

  if (currentSort === 'price-asc')       list.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc')  list.sort((a,b) => b.price - a.price);
  else if (currentSort === 'rating-desc') list.sort((a,b) => b.rating - a.rating);
  else if (currentSort === 'discount-desc')list.sort((a,b) => b.discount - a.discount);

  if (list.length === 0) {
    grid.innerHTML = '';
    if (noRes) noRes.hidden = false;
    return;
  }
  if (noRes) noRes.hidden = true;
  grid.innerHTML = list.map(renderProductCard).join('');
  attachCardEvents(grid);
}

// ===========================================
// PAGE: OFFERS
// ===========================================
function initOffersPage() {
  renderOfferCards();
  renderOfferProducts();
}

function renderOfferCards() {
  const grid = document.getElementById('offersGrid'); if (!grid) return;
  grid.innerHTML = OFFERS.map(o => `
    <div class="offer-card" style="background:${o.gradient};color:#fff;">
      <span class="offer-tag">${o.tag}</span>
      <div class="offer-title">${o.title}</div>
      <p class="offer-desc">${o.desc}</p>
      <a href="products.html?cat=${o.category}" class="btn-offer">
        Shop Now <i class="fa fa-arrow-right"></i>
      </a>
      <span class="offer-emoji">${o.emoji}</span>
    </div>`).join('');
}

function renderOfferProducts() {
  const grid = document.getElementById('offerProductsGrid'); if (!grid) return;
  const discounted = [...PRODUCTS].sort((a,b) => b.discount - a.discount).slice(0, 8);
  grid.innerHTML = discounted.map(renderProductCard).join('');
  attachCardEvents(grid);
}

// ===========================================
// PAGE: ORDERS
// ===========================================
async function initOrdersPage() {
  if (typeof API !== 'undefined' && API.isLoggedIn && API.isLoggedIn()) {
    try {
      const res = await API.orders.getAll();
      if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
        orders = res.data.map(o => ({
          id: o.order_code || `FC${o.id}`,
          numericId: o.id,
          order_code: o.order_code,
          date: new Date(o.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
          time: new Date(o.created_at).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }),
          items: (o.items || []).map(i => ({ name: i.name, emoji: i.emoji, qty: i.quantity, price: i.price })),
          subtotal: o.subtotal,
          delivery: o.delivery_fee,
          total: o.total,
          payment: o.payment_method,
          address: `${o.address}, ${o.city} - ${o.pincode}`,
          status: o.status,
          trackStep: o.track_step,
        }));
        saveOrders();
      }
    } catch (err) {
      console.warn('API orders fetch fallback to localStorage:', err.message);
    }
  }
  renderOrdersList();
}

function renderOrdersList() {
  const list   = document.getElementById('ordersList');
  const noOrds = document.getElementById('noOrders');
  if (!list) return;

  if (orders.length === 0) {
    list.innerHTML = '';
    if (noOrds) noOrds.style.display = 'block';
    return;
  }
  if (noOrds) noOrds.style.display = 'none';

  list.innerHTML = orders.map(order => {
    const oid    = order.id || order.order_code;
    const items  = (order.items || []).map(i => `${i.name} x${i.qty || i.quantity || 1}`).slice(0,2).join(', ') + ((order.items && order.items.length > 2) ? ` +${order.items.length-2} more` : '');
    const isCancelled = order.status === 'cancelled';
    const isDelivered = order.status === 'delivered';
    const sCls   = isDelivered ? 'status-delivered' : isCancelled ? 'status-cancelled' : 'status-processing';
    const sLabel = isDelivered ? 'Delivered' : isCancelled ? 'Cancelled' : 'Processing';
    const canCancel = !isDelivered && !isCancelled;

    return `
      <div class="order-card">
        <div class="order-icon" style="${isCancelled ? 'background:#fee2e2;color:#dc2626;' : ''}"><i class="fa ${isCancelled ? 'fa-ban' : 'fa-box'}"></i></div>
        <div class="order-meta">
          <div class="order-id">#${oid}</div>
          <div class="order-date">${order.date || ''} ${order.time ? 'at ' + order.time : ''}</div>
          <div class="order-items-text">${items}</div>
        </div>
        <div class="order-amount" style="${isCancelled ? 'text-decoration:line-through;color:var(--gray-400);' : ''}">Rs.${order.total}</div>
        <span class="order-status ${sCls}">${sLabel}</span>
        <div class="order-actions">
          <button class="btn-track" data-oid="${oid}">
            <i class="fa fa-route"></i> Track
          </button>
          <a href="feedback.html?orderId=${oid}" class="btn-feedback-order" title="Rate your delivery experience">
            <i class="fa fa-star"></i> Feedback
          </a>
          ${canCancel ? `
            <button class="btn-cancel-order" data-cancel-oid="${oid}" title="Cancel this order">
              <i class="fa fa-times"></i> Cancel
            </button>` : ''}
        </div>
      </div>`;
  }).join('');

  list.querySelectorAll('[data-oid]').forEach(btn => {
    btn.addEventListener('click', () => openTrackModal(btn.dataset.oid));
  });

  list.querySelectorAll('[data-cancel-oid]').forEach(btn => {
    btn.addEventListener('click', () => openCancelModal(btn.dataset.cancelOid));
  });
}

// ===========================================
// CUSTOMER FEEDBACK LOGIC
// ===========================================
const DEFAULT_FEEDBACKS = [
  {
    id: 1,
    order_id: 'FC-91823',
    name: 'Priya Sundaram',
    email: 'priya.s@example.com',
    rating: 5,
    category: '15-Min Delivery Speed',
    nps_score: 10,
    tags: '⚡ Lightning Fast, 🥦 Super Fresh',
    message: 'Ordered fresh spinach, tomatoes and milk at 8:15 AM and it was at my doorstep by 8:28 AM in Chennai! Absolutely unbelievable speed and top quality produce.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 2,
    order_id: 'FC-88210',
    name: 'Karthik Raja',
    email: 'karthik.r@example.com',
    rating: 5,
    category: 'Freshness & Quality',
    nps_score: 10,
    tags: '🥦 Super Fresh, 📦 Spill-Free Box',
    message: 'The mangoes and strawberries were handpicked and so sweet. Packaging was 100% eco-friendly and items were chilled and pristine.',
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 3,
    order_id: 'FC-77341',
    name: 'Ananya Ramesh',
    email: 'ananya.ramesh@example.com',
    rating: 4,
    category: 'Packaging & Care',
    nps_score: 9,
    tags: '📦 Spill-Free Box, 😊 Friendly Delivery',
    message: 'Delivery partner called politely and handed over the grocery bag safely. Really impressed with how neat everything was organized inside.',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 4,
    order_id: 'FC-65412',
    name: 'Venkatesh Kumar',
    email: 'venkat.k@example.com',
    rating: 5,
    category: 'Prices & Offers',
    nps_score: 10,
    tags: '💰 Great Discount, ⚡ Lightning Fast',
    message: 'Got 20% off on fruits and free delivery! Cheaper than my local supermarket and delivered in under 20 minutes.',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

let localFeedbacks = [];
function loadFeedbacks() {
  localFeedbacks = ls.load('fc_feedbacks', DEFAULT_FEEDBACKS);
}
function saveFeedbacks() {
  ls.save('fc_feedbacks', localFeedbacks);
}

const STAR_REACTIONS = {
  1: '😞 Disappointed - Needs Improvement',
  2: '😐 Fair - Could be Much Better',
  3: '🙂 Good - Satisfactory Delivery',
  4: '😊 Very Good - Fresh & On-Time',
  5: '🤩 Loved it! Super Fresh & Fast!'
};

async function initFeedbackPage() {
  loadFeedbacks();

  const starsRow = document.getElementById('starsRow');
  const ratingInput = document.getElementById('feedbackRatingInput');
  const starReaction = document.getElementById('starReactionText');
  const categoryChips = document.getElementById('categoryChips');
  const categoryInput = document.getElementById('feedbackCategoryInput');
  const complimentsWrap = document.getElementById('complimentsWrap');
  const npsButtons = document.getElementById('npsButtons');
  const npsDisplay = document.getElementById('npsDisplayVal');
  const npsInput = document.getElementById('feedbackNpsInput');
  const fbName = document.getElementById('fbName');
  const fbEmail = document.getElementById('fbEmail');
  const fbPhone = document.getElementById('fbPhone');
  const fbOrderId = document.getElementById('fbOrderId');
  const fbMessage = document.getElementById('fbMessage');
  const charCounter = document.getElementById('charCounter');
  const feedbackForm = document.getElementById('customerFeedbackForm');
  const submitBtn = document.getElementById('submitFeedbackBtn');
  const filterSelect = document.getElementById('reviewFilterSelect');

  // Pre-fill user data if logged in
  if (currentUser) {
    if (fbName && currentUser.name) fbName.value = currentUser.name;
    if (fbEmail && currentUser.email) fbEmail.value = currentUser.email;
    if (fbPhone && currentUser.phone) fbPhone.value = currentUser.phone;
  }

  // Pre-fill Order ID from URL parameter (e.g., feedback.html?orderId=FC-84920)
  const urlParams = new URLSearchParams(window.location.search);
  const qOrderId = urlParams.get('orderId');
  if (qOrderId && fbOrderId) {
    fbOrderId.value = qOrderId;
    const prefillWrap = document.getElementById('orderPrefillWrap');
    const prefillText = document.getElementById('orderPrefillText');
    if (prefillWrap && prefillText) {
      prefillText.textContent = '#' + qOrderId;
      prefillWrap.style.display = 'block';
    }
  }

  // 1. Interactive Star Rating with hover & click
  let selectedRating = 5;
  if (starsRow) {
    const starBtns = starsRow.querySelectorAll('.star-btn');
    function updateStarsUI(val) {
      starBtns.forEach(btn => {
        const r = parseInt(btn.dataset.rating, 10);
        btn.classList.toggle('active', r <= val);
      });
      if (starReaction) {
        starReaction.textContent = STAR_REACTIONS[val] || '';
      }
    }

    starBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const hoverVal = parseInt(btn.dataset.rating, 10);
        starBtns.forEach(b => {
          b.classList.toggle('hovered', parseInt(b.dataset.rating, 10) <= hoverVal);
        });
        if (starReaction) starReaction.textContent = STAR_REACTIONS[hoverVal] || '';
      });
      btn.addEventListener('mouseleave', () => {
        starBtns.forEach(b => b.classList.remove('hovered'));
        updateStarsUI(selectedRating);
      });
      btn.addEventListener('click', () => {
        selectedRating = parseInt(btn.dataset.rating, 10);
        if (ratingInput) ratingInput.value = selectedRating;
        updateStarsUI(selectedRating);
      });
    });
  }

  // 2. Category Chips Selection
  if (categoryChips) {
    categoryChips.querySelectorAll('.category-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.querySelectorAll('.category-chip-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (categoryInput) categoryInput.value = chip.dataset.cat;
      });
    });
  }

  // 3. Multi-Select Compliment Tags
  if (complimentsWrap) {
    complimentsWrap.querySelectorAll('.compliment-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('active');
      });
    });
  }

  // 4. NPS 1-10 Buttons
  if (npsButtons) {
    npsButtons.querySelectorAll('.nps-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        npsButtons.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const score = btn.dataset.nps;
        if (npsDisplay) npsDisplay.textContent = `${score} / 10`;
        if (npsInput) npsInput.value = score;
      });
    });
  }

  // 5. Message Character Counter
  if (fbMessage && charCounter) {
    fbMessage.addEventListener('input', () => {
      const len = fbMessage.value.length;
      charCounter.textContent = `${len} / 600`;
      charCounter.style.color = len >= 580 ? 'var(--danger)' : 'var(--gray-400)';
    });
  }

  // 6. Submit Feedback Form
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = fbName?.value.trim() || '';
      const email = fbEmail?.value.trim() || '';
      const phone = fbPhone?.value.trim() || '';
      const orderId = fbOrderId?.value.trim() || '';
      const rating = parseInt(ratingInput?.value || selectedRating, 10);
      const category = categoryInput?.value || '15-Min Delivery Speed';
      const nps = parseInt(npsInput?.value || 10, 10);
      const message = fbMessage?.value.trim() || '';

      const activeTags = [];
      if (complimentsWrap) {
        complimentsWrap.querySelectorAll('.compliment-pill.active').forEach(p => {
          activeTags.push(p.dataset.tag);
        });
      }

      if (!name) {
        showToast('Please enter your name.', 'error');
        fbName?.focus();
        return;
      }
      if (!email || !email.includes('@')) {
        showToast('Please provide a valid email address.', 'error');
        fbEmail?.focus();
        return;
      }
      if (!message || message.length < 5) {
        showToast('Please share a few words about your experience (min. 5 characters).', 'error');
        fbMessage?.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Submitting Feedback...';
      }

      const payload = {
        name,
        email,
        phone,
        rating,
        category,
        nps_score: nps,
        tags: activeTags.join(', '),
        message,
        order_id: orderId || null
      };

      try {
        let savedFeedback = null;
        let couponCode = 'FRESHLOVE10';

        try {
          const res = await API.feedback.submit(payload);
          if (res.success && res.data) {
            savedFeedback = res.data;
            if (res.discountCoupon) couponCode = res.discountCoupon;
          }
        } catch (apiErr) {
          console.warn('API submission failed or offline, saving locally:', apiErr.message);
        }

        if (!savedFeedback) {
          savedFeedback = {
            id: Date.now(),
            name,
            email,
            phone,
            rating,
            category,
            nps_score: nps,
            tags: activeTags.join(', '),
            message,
            order_id: orderId || null,
            created_at: new Date().toISOString()
          };
        }

        localFeedbacks.unshift(savedFeedback);
        saveFeedbacks();

        // Show celebration reward modal
        const modal = document.getElementById('feedbackSuccessModal');
        const overlay = document.getElementById('feedbackSuccessOverlay');
        const rewardUser = document.getElementById('rewardUserName');
        const couponText = document.getElementById('rewardCouponText');

        if (rewardUser) rewardUser.textContent = name;
        if (couponText) couponText.textContent = couponCode;

        if (modal && overlay) {
          overlay.hidden = false;
          modal.hidden = false;
        }

        showToast('Feedback submitted successfully! 💚 Enjoy 10% off.', 'success');

        fbMessage.value = '';
        if (charCounter) charCounter.textContent = '0 / 600';

        renderReviewsList();
        updateFeedbackStats();
      } catch (err) {
        showToast(err.message || 'Error submitting feedback. Please try again.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i> Submit Feedback &amp; Claim 10% Off';
        }
      }
    });
  }

  // 7. Success Modal Actions
  const closeSuccessBtn = document.getElementById('closeFeedbackModalBtn');
  const successOverlay = document.getElementById('feedbackSuccessOverlay');
  const successModal = document.getElementById('feedbackSuccessModal');
  function closeFeedbackModal() {
    if (successModal) successModal.hidden = true;
    if (successOverlay) successOverlay.hidden = true;
  }
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeFeedbackModal);
  if (successOverlay) successOverlay.addEventListener('click', closeFeedbackModal);

  // Copy coupon code
  const copyBtn = document.getElementById('copyCouponBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = document.getElementById('rewardCouponText')?.textContent || 'FRESHLOVE10';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          showToast(`Coupon ${code} copied! 🎉`, 'success');
          copyBtn.innerHTML = '<i class="fa fa-check"></i> Copied!';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa fa-copy"></i> Copy';
          }, 2000);
        }).catch(() => {
          showToast(`Coupon: ${code}`, 'info');
        });
      } else {
        showToast(`Coupon: ${code}`, 'info');
      }
    });
  }

  // 8. Filter Reviews
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      renderReviewsList(filterSelect.value);
    });
  }

  // Fetch from API or render local
  try {
    const apiRes = await API.feedback.getAll({ limit: 30 });
    if (apiRes.success && apiRes.data && apiRes.data.length > 0) {
      localFeedbacks = apiRes.data;
      saveFeedbacks();
    }
  } catch {
    // Keep localFeedbacks
  }

  renderReviewsList();
  updateFeedbackStats();
}

function renderReviewsList(filter = 'all') {
  const container = document.getElementById('feedbackReviewsList');
  if (!container) return;

  let list = [...localFeedbacks];
  if (filter === '5') {
    list = list.filter(r => r.rating === 5);
  } else if (filter && filter !== 'all') {
    list = list.filter(r => r.category === filter);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:32px 16px;background:white;border-radius:var(--radius-md);border:1px dashed var(--gray-200);">
        <div style="font-size:2rem;margin-bottom:8px;">💬</div>
        <p style="color:var(--gray-600);font-size:0.9rem;">No reviews in this category yet. Be the first to share your experience!</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map(item => {
    const initial = (item.name || 'C').charAt(0).toUpperCase();
    const starsHtml = Array.from({ length: 5 }, (_, i) => {
      return `<i class="fa fa-star" style="color:${i < item.rating ? '#eab308' : '#e2e8f0'}"></i>`;
    }).join('');

    const tagsArray = item.tags ? (typeof item.tags === 'string' ? item.tags.split(',') : item.tags) : [];
    const tagsHtml = tagsArray
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => `<span class="review-tag-badge">${t}</span>`)
      .join('');

    let timeText = 'Recently';
    if (item.created_at) {
      try {
        const d = new Date(item.created_at);
        timeText = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      } catch {
        timeText = 'Recently';
      }
    }

    return `
      <article class="review-card">
        <div class="review-card-top">
          <div class="review-author-wrap">
            <div class="author-avatar">${initial}</div>
            <div>
              <div class="author-name">
                ${item.name || 'Verified Customer'}
                <span class="verified-badge" title="Verified Grocery Delivery"><i class="fa fa-check-circle"></i> Verified</span>
              </div>
              <span class="review-time">${timeText}</span>
            </div>
          </div>
          <div class="review-stars">${starsHtml}</div>
        </div>
        ${item.category ? `<span class="review-category-badge">${item.category}</span>` : ''}
        <p class="review-text">${item.message || ''}</p>
        ${tagsHtml ? `<div class="review-tags-list">${tagsHtml}</div>` : ''}
      </article>`;
  }).join('');
}

function updateFeedbackStats() {
  const total = localFeedbacks.length;
  if (total === 0) return;

  const sumRating = localFeedbacks.reduce((acc, r) => acc + (r.rating || 5), 0);
  const avg = (sumRating / total).toFixed(1);

  const avgEl = document.getElementById('metricAvgRating');
  if (avgEl) avgEl.textContent = `${avg} / 5`;

  const summaryScore = document.getElementById('summaryScore');
  if (summaryScore) summaryScore.textContent = avg;

  const summaryCount = document.getElementById('summaryCount');
  if (summaryCount) summaryCount.textContent = `${total}+`;

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  localFeedbacks.forEach(r => {
    const val = r.rating || 5;
    if (counts[val] !== undefined) counts[val]++;
  });

  for (let s = 1; s <= 5; s++) {
    const pct = Math.round((counts[s] / total) * 100);
    const bar = document.getElementById(`bar${s}`);
    const pctLabel = document.getElementById(`pct${s}`);
    if (bar) bar.style.width = `${pct}%`;
    if (pctLabel) pctLabel.textContent = `${pct}%`;
  }
}

// Floating Feedback Pill widget on other pages
function initFloatingFeedbackButton() {
  if (document.body.dataset.page === 'feedback') return;
  if (document.getElementById('floatingFeedbackBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'floatingFeedbackBtn';
  btn.href = 'feedback.html';
  btn.className = 'floating-feedback-btn';
  btn.innerHTML = '<i class="fa fa-comment-dots"></i> Feedback';
  btn.setAttribute('aria-label', 'Share Customer Feedback');
  document.body.appendChild(btn);
}

// ===========================================
// MAIN INIT
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  loadOrders();
  loadUser();
  loadWishlist();

  // Shared components
  initHeader();
  initMobileNav();
  initSearch();
  initLocationSelector();
  initProfileMenu();
  initCartSidebar();
  initAuth();
  initCheckout();
  initConfirmModal();
  initTrackModal();
  initCancelModal();
  updateCartUI();
  updateProfileUI();
  initFloatingFeedbackButton();

  // Page specific
  const page = document.body.dataset.page;
  if      (page === 'home')       initHomePage();
  else if (page === 'categories') initCategoriesPage();
  else if (page === 'products')   initProductsPage();
  else if (page === 'offers')     initOffersPage();
  else if (page === 'orders')     initOrdersPage();
  else if (page === 'feedback')   initFeedbackPage();

  console.log(`FreshCart v2.5 Online | Page: ${page}`);
});
