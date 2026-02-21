import express from 'express';
import DashboardController from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary', DashboardController.getSummary);
router.get('/recent-sales', DashboardController.getRecentSales);
router.get('/category-stats', DashboardController.getCategoryStats);

export default router;
