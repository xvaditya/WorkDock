import RevenueLeakService from '../services/revenueLeakService.js';

class RevenueLeakController {
  static async getLeadHeatScore(req, res, next) {
    try {
      const leakInfo = await RevenueLeakService.detectLeak(req.params.id);
      res.status(200).json({
        success: true,
        data: leakInfo,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllLeaks(req, res, next) {
    try {
      const leaks = await RevenueLeakService.getAllLeaks();
      const totalLoss = await RevenueLeakService.getTotalRevenueLoss();

      res.status(200).json({
        success: true,
        data: leaks,
        summary: {
          totalLeaks: leaks.length,
          estimatedTotalLoss: totalLoss.totalLoss,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async scanLeaks(req, res, next) {
    try {
      const result = await RevenueLeakService.scanAndLogLeaks();
      res.status(200).json({
        success: true,
        data: result,
        message: 'Leak scan completed',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTotalRevenueLoss(req, res, next) {
    try {
      const loss = await RevenueLeakService.getTotalRevenueLoss();
      res.status(200).json({
        success: true,
        data: loss,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLeadDistribution(req, res, next) {
    try {
      const distribution = await RevenueLeakService.getLeadDistributionByHeat();
      res.status(200).json({
        success: true,
        data: distribution,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RevenueLeakController;
