import Product from '../models/Product.js';
import Lead from '../models/Lead.js';
import Sale from '../models/Sale.js';
import RevenueLeakLog from '../models/RevenueLeakLog.js';
import SalesService from './salesService.js';
import RevenueLeakService from './revenueLeakService.js';

class DashboardService {
  /**
   * Get comprehensive dashboard summary
   */
  static async getDashboardSummary() {
    // Parallel queries for performance
    const [
      totalRevenue,
      totalProducts,
      lowStockProducts,
      totalLeads,
      topSellingProducts,
      revenueLosses,
      leadDistribution,
    ] = await Promise.all([
      this.getTotalRevenue(),
      this.getTotalProducts(),
      this.getLowStockCount(),
      this.getTotalLeads(),
      SalesService.getTopSellingProducts(5),
      RevenueLeakService.getTotalRevenueLoss(),
      RevenueLeakService.getLeadDistributionByHeat(),
    ]);

    return {
      totalRevenue,
      totalProducts,
      lowStockCount: lowStockProducts,
      totalLeads,
      estimatedRevenueLost: revenueLosses.totalLoss,
      leadDistribution,
      topSellingProducts: topSellingProducts.map((p) => ({
        id: p._id,
        name: p.name,
        unitsSold: p.totalUnitsSold,
        revenue: p.totalRevenueGenerated,
        profit: (p.sellingPrice - p.costPrice) * p.totalUnitsSold,
      })),
      summary: {
        activeLeads: totalLeads,
        productsLowOnStock: lowStockProducts,
        leakedDeals: revenueLosses.count,
        totalProfit: await this.getTotalProfit(),
      },
    };
  }

  /**
   * Get total revenue from all sales
   */
  static async getTotalRevenue() {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' },
        },
      },
    ]);

    return result[0]?.total || 0;
  }

  /**
   * Get total products count
   */
  static async getTotalProducts() {
    return await Product.countDocuments();
  }

  /**
   * Get count of low stock products
   */
  static async getLowStockCount() {
    return await Product.countDocuments({
      $expr: { $lt: ['$currentStock', '$minimumThreshold'] },
    });
  }

  /**
   * Get total leads count
   */
  static async getTotalLeads() {
    return await Lead.countDocuments();
  }

  /**
   * Get total profit across all products
   */
  static async getTotalProfit() {
    const result = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: {
            $sum: {
              $multiply: [
                { $subtract: ['$sellingPrice', '$costPrice'] },
                '$totalUnitsSold',
              ],
            },
          },
        },
      },
    ]);

    return result[0]?.totalProfit || 0;
  }

  /**
   * Get recent sales for dashboard
   */
  static async getRecentSales(limit = 10) {
    return await Sale.find()
      .populate('productId', 'name sku')
      .sort({ soldAt: -1 })
      .limit(limit)
      .lean();
  }

  /**
   * Get dashboard stats by category
   */
  static async getCategoryStats() {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          productCount: { $sum: 1 },
          totalRevenue: { $sum: '$totalRevenueGenerated' },
          totalUnitsSold: { $sum: '$totalUnitsSold' },
          totalProfit: {
            $sum: {
              $multiply: [
                { $subtract: ['$sellingPrice', '$costPrice'] },
                '$totalUnitsSold',
              ],
            },
          },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    return stats;
  }
}

export default DashboardService;
