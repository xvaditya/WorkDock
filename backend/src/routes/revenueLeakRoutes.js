import express from 'express';
import RevenueLeakController from '../controllers/revenueLeakController.js';

const router = express.Router();

router.get('/scan', RevenueLeakController.scanLeaks);
router.get('/', RevenueLeakController.getAllLeaks);
router.get('/total-loss', RevenueLeakController.getTotalRevenueLoss);
router.get('/distribution', RevenueLeakController.getLeadDistribution);
router.get('/:id/heat-score', RevenueLeakController.getLeadHeatScore);

export default router;
