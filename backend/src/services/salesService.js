import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

class SalesService {
  /**
   * Create a new sale and auto-update product stock
   */
  static async createSale(productId, quantity, totalAmount) {
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check sufficient stock
    if (product.currentStock < quantity) {
      throw new Error(
        `Insufficient stock. Available: ${product.currentStock}, Requested: ${quantity}`
      );
    }

    // Create sale
    const sale = await Sale.create({
      productId,
      quantity,
      totalAmount,
    });

    // Auto-update product
    product.currentStock -= quantity;
    product.totalUnitsSold += quantity;
    product.totalRevenueGenerated += totalAmount;
    await product.save();

    return sale;
  }

  /**
   * Get all sales with product details
   */
  static async getAllSales(filters = {}) {
    const sales = await Sale.find(filters)
      .populate('productId', 'name sku category sellingPrice')
      .sort({ soldAt: -1 });

    return sales;
  }

  /**
   * Get sales for a specific product
   */
  static async getSalesByProduct(productId) {
    const sales = await Sale.find({ productId })
      .sort({ soldAt: -1 });

    return sales;
  }

  /**
   * Get sales metrics
   */
  static async getSalesMetrics() {
    const result = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalAmount' },
          totalUnits: { $sum: '$quantity' },
          avgOrderValue: { $avg: '$totalAmount' },
          transactionCount: { $sum: 1 },
        },
      },
    ]);

    return result[0] || {
      totalSales: 0,
      totalUnits: 0,
      avgOrderValue: 0,
      transactionCount: 0,
    };
  }

  /**
   * Get top selling products
   */
  static async getTopSellingProducts(limit = 10) {
    const products = await Product.find()
      .sort({ totalUnitsSold: -1 })
      .limit(limit)
      .lean();

    return products;
  }
}

export default SalesService;
