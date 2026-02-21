import DashboardService from '../services/dashboardService.js';

class DashboardController {
  static async getSummary(req, res, next) {
    try {
      const summary = await DashboardService.getDashboardSummary();
      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRecentSales(req, res, next) {
    try {
      const limit = req.query.limit || 10;
      const sales = await DashboardService.getRecentSales(parseInt(limit));
      res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryStats(req, res, next) {
    try {
      const stats = await DashboardService.getCategoryStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default DashboardController;
