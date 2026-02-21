import Lead from '../models/Lead.js';

class LeadController {
  static async createLead(req, res, next) {
    try {
      const lead = await Lead.create(req.body);
      res.status(201).json({
        success: true,
        data: lead,
        message: 'Lead created successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllLeads(req, res, next) {
    try {
      const leads = await Lead.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: leads,
        count: leads.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLeadById(req, res, next) {
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found',
        });
      }
      res.status(200).json({
        success: true,
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateLead(req, res, next) {
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found',
        });
      }

      res.status(200).json({
        success: true,
        data: lead,
        message: 'Lead updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLead(req, res, next) {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Lead deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default LeadController;
