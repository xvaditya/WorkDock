import express from 'express';
import SalesController from '../controllers/salesController.js';

const router = express.Router();

router.post('/', SalesController.createSale);
router.get('/', SalesController.getAllSales);
router.get('/metrics', SalesController.getSalesMetrics);
router.get('/top-products', SalesController.getTopSellingProducts);
router.get('/product/:productId', SalesController.getSalesByProduct);

export default router;
