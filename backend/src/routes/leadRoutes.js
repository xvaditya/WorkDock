import express from 'express';
import LeadController from '../controllers/leadController.js';

const router = express.Router();

router.post('/', LeadController.createLead);
router.get('/', LeadController.getAllLeads);
router.get('/:id', LeadController.getLeadById);
router.put('/:id', LeadController.updateLead);
router.delete('/:id', LeadController.deleteLead);

export default router;
