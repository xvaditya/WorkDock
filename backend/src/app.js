import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import revenueLeakRoutes from './routes/revenueLeakRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🏭 WorkDock Backend - B2B SaaS Operations Platform',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      products: '/products',
      sales: '/sales',
      leads: '/leads',
      revenue: '/revenue-leaks',
      dashboard: '/dashboard',
    },
  });
});

// Routes
app.use('/products', productRoutes);
app.use('/sales', salesRoutes);
app.use('/leads', leadRoutes);
app.use('/revenue-leaks', revenueLeakRoutes);
app.use('/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
