/**
 * API Service
 * Connects frontend to WorkDock backend on localhost:5000
 */

const API_URL = 'http://localhost:5000';

// ============ PRODUCTS ============
export const productAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      return res.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return { success: false };
    }
  },

  create: async (product) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return res.json();
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false };
    }
  },

  update: async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return res.json();
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false };
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false };
    }
  },

  getLowStock: async () => {
    try {
      const res = await fetch(`${API_URL}/products/low-stock`);
      return res.json();
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      return { success: false, data: [] };
    }
  },
};

// ============ SALES ============
export const salesAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/sales`);
      return res.json();
    } catch (error) {
      console.error('Error fetching sales:', error);
      return { success: false, data: [] };
    }
  },

  create: async (sale) => {
    try {
      const res = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      return res.json();
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false };
    }
  },

  getMetrics: async () => {
    try {
      const res = await fetch(`${API_URL}/sales/metrics`);
      return res.json();
    } catch (error) {
      console.error('Error fetching sales metrics:', error);
      return { success: false };
    }
  },

  getTopProducts: async () => {
    try {
      const res = await fetch(`${API_URL}/sales/top-products`);
      return res.json();
    } catch (error) {
      console.error('Error fetching top products:', error);
      return { success: false, data: [] };
    }
  },

  getByProduct: async (productId) => {
    try {
      const res = await fetch(`${API_URL}/sales/product/${productId}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching product sales:', error);
      return { success: false, data: [] };
    }
  },
};

// ============ LEADS ============
export const leadsAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/leads`);
      return res.json();
    } catch (error) {
      console.error('Error fetching leads:', error);
      return { success: false, data: [] };
    }
  },

  getById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`);
      return res.json();
    } catch (error) {
      console.error('Error fetching lead:', error);
      return { success: false };
    }
  },

  create: async (lead) => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      return res.json();
    } catch (error) {
      console.error('Error creating lead:', error);
      return { success: false };
    }
  },

  update: async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      return res.json();
    } catch (error) {
      console.error('Error updating lead:', error);
      return { success: false };
    }
  },

  delete: async (id) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    } catch (error) {
      console.error('Error deleting lead:', error);
      return { success: false };
    }
  },
};

// ============ REVENUE LEAK DETECTION ============
export const leakDetectionAPI = {
  getAllLeaks: async () => {
    try {
      const res = await fetch(`${API_URL}/revenue-leaks`);
      return res.json();
    } catch (error) {
      console.error('Error fetching leaks:', error);
      return { success: false, data: [] };
    }
  },

  scanForLeaks: async () => {
    try {
      const res = await fetch(`${API_URL}/revenue-leaks/scan`);
      return res.json();
    } catch (error) {
      console.error('Error scanning for leaks:', error);
      return { success: false };
    }
  },

  getTotalLoss: async () => {
    try {
      const res = await fetch(`${API_URL}/revenue-leaks/total-loss`);
      return res.json();
    } catch (error) {
      console.error('Error fetching total loss:', error);
      return { success: false, data: 0 };
    }
  },

  getHeatScore: async (leadId) => {
    try {
      const res = await fetch(`${API_URL}/revenue-leaks/${leadId}/heat-score`);
      return res.json();
    } catch (error) {
      console.error('Error fetching heat score:', error);
      return { success: false };
    }
  },

  getDistribution: async () => {
    try {
      const res = await fetch(`${API_URL}/revenue-leaks/distribution`);
      return res.json();
    } catch (error) {
      console.error('Error fetching distribution:', error);
      return { success: false, data: {} };
    }
  },
};

// ============ DASHBOARD ============
export const dashboardAPI = {
  getSummary: async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/summary`);
      return res.json();
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      return {
        success: false,
        data: {
          totalRevenue: 0,
          totalProducts: 0,
          lowStockCount: 0,
          totalLeads: 0,
          topSellingProducts: [],
          revenueLosses: 0,
          leadDistribution: {},
        },
      };
    }
  },

  getRecentSales: async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/recent-sales`);
      return res.json();
    } catch (error) {
      console.error('Error fetching recent sales:', error);
      return { success: false, data: [] };
    }
  },

  getCategoryStats: async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/category-stats`);
      return res.json();
    } catch (error) {
      console.error('Error fetching category stats:', error);
      return { success: false, data: [] };
    }
  },
};
