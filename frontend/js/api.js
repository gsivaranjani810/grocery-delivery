/* =============================================
   FreshCart - Frontend API Client
   =============================================
   Handles all communication with the backend.
   Uses fetch() with JWT token management.
   ============================================= */
'use strict';

const API = (() => {
  const BASE_URL = (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:'))
    ? `${window.location.origin}/api`
    : 'http://localhost:5000/api';

  // ── Token Management ──
  function getToken() {
    return localStorage.getItem('fc_token');
  }

  function setToken(token) {
    localStorage.setItem('fc_token', token);
  }

  function removeToken() {
    localStorage.removeItem('fc_token');
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // ── HTTP Helpers ──
  async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  }

  function get(endpoint) {
    return request(endpoint, { method: 'GET' });
  }

  function post(endpoint, body) {
    return request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  function put(endpoint, body) {
    return request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  function del(endpoint) {
    return request(endpoint, { method: 'DELETE' });
  }

  // ── Auth API ──
  const auth = {
    async register(name, email, password, phone) {
      const data = await post('/auth/register', { name, email, password, phone });
      if (data.success && data.data.token) {
        setToken(data.data.token);
      }
      return data;
    },

    async login(email, password) {
      const data = await post('/auth/login', { email, password });
      if (data.success && data.data.token) {
        setToken(data.data.token);
      }
      return data;
    },

    logout() {
      removeToken();
      localStorage.removeItem('fc_user');
    },

    getProfile() {
      return get('/auth/profile');
    },

    updateProfile(data) {
      return put('/auth/profile', data);
    },
  };

  // ── Products API ──
  const products = {
    getAll(params = {}) {
      const query = new URLSearchParams(params).toString();
      return get(`/products${query ? '?' + query : ''}`);
    },

    getById(id) {
      return get(`/products/${id}`);
    },
  };

  // ── Categories API ──
  const categories = {
    getAll() {
      return get('/categories');
    },

    getBySlug(slug) {
      return get(`/categories/${slug}`);
    },
  };

  // ── Cart API ──
  const cart = {
    get() {
      return get('/cart');
    },

    add(productId, quantity = 1) {
      return post('/cart', { productId, quantity });
    },

    update(cartItemId, quantity) {
      return put(`/cart/${cartItemId}`, { quantity });
    },

    remove(cartItemId) {
      return del(`/cart/${cartItemId}`);
    },

    clear() {
      return del('/cart');
    },
  };

  // ── Orders API ──
  const orders = {
    place(orderData) {
      return post('/orders', orderData);
    },

    getAll() {
      return get('/orders');
    },

    getById(id) {
      return get(`/orders/${id}`);
    },

    cancel(id, reason = '') {
      return put(`/orders/${id}/cancel`, { reason });
    },
  };

  // ── Admin API ──
  const admin = {
    getStats() {
      return get('/admin/stats');
    },

    getAllOrders(params = {}) {
      const query = new URLSearchParams(params).toString();
      return get(`/admin/orders${query ? '?' + query : ''}`);
    },

    updateProduct(id, data) {
      return put(`/admin/products/${id}`, data);
    },

    updateOrderStatus(id, status) {
      return put(`/admin/orders/${id}`, { status });
    },
  };

  // ── Feedback API ──
  const feedback = {
    submit(data) {
      return post('/feedback', data);
    },
    getAll(params = {}) {
      const query = new URLSearchParams(params).toString();
      return get(`/feedback${query ? '?' + query : ''}`);
    },
    getStats() {
      return get('/feedback/stats');
    },
  };

  // ── Health Check ──
  async function healthCheck() {
    try {
      const data = await get('/health');
      console.log('✅ API is healthy:', data.message);
      return true;
    } catch {
      console.warn('⚠️ API is not reachable. Running in offline mode.');
      return false;
    }
  }

  return {
    getToken, setToken, removeToken, isLoggedIn,
    auth, products, categories, cart, orders, admin, feedback,
    healthCheck,
  };
})();
