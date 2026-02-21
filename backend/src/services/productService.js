import Product from '../models/Product.js';

class ProductService {
  /**
   * Create a new product
   */
  static async createProduct(productData) {
    const product = await Product.create(productData);
    return product;
  }

  /**
   * Get all products
   */
  static async getAllProducts(filters = {}) {
    const products = await Product.find(filters).lean();
    return products;
  }

  /**
   * Get product by ID with detailed analytics
   */
  static async getProductById(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');

    const isLowStock = product.currentStock < product.minimumThreshold;

    return {
      basicInfo: {
        id: product._id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        costPrice: product.costPrice,
        sellingPrice: product.sellingPrice,
      },
      stockStatus: {
        currentStock: product.currentStock,
        minimumThreshold: product.minimumThreshold,
        isLowStock,
        status: isLowStock ? 'LOW' : 'NORMAL',
      },
      salesPerformance: {
        totalUnitsSold: product.totalUnitsSold,
        totalRevenueGenerated: product.totalRevenueGenerated,
        profitPerUnit: product.profitPerUnit,
        totalProfit: product.totalProfit,
      },
      createdAt: product.createdAt,
    };
  }

  /**
   * Update a product
   */
  static async updateProduct(productId, updateData) {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) throw new Error('Product not found');
    return product;
  }

  /**
   * Delete a product
   */
  static async deleteProduct(productId) {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new Error('Product not found');
    return product;
  }

  /**
   * Get low stock products
   */
  static async getLowStockProducts() {
    const products = await Product.find({
      $expr: { $lt: ['$currentStock', '$minimumThreshold'] },
    }).lean();

    return products;
  }

  /**
   * Get stock status summary
   */
  static async getStockSummary() {
    const result = await Product.aggregate([
      {
        $facet: {
          lowStock: [
            {
              $match: {
                $expr: { $lt: ['$currentStock', '$minimumThreshold'] },
              },
            },
            { $count: 'count' },
          ],
          normal: [
            {
              $match: {
                $expr: { $gte: ['$currentStock', '$minimumThreshold'] },
              },
            },
            { $count: 'count' },
          ],
          totalValue: [{ $group: { _id: null, value: { $sum: '$currentStock' } } }],
        },
      },
    ]);

    return {
      lowStockCount: result[0]?.lowStock[0]?.count || 0,
      normalStockCount: result[0]?.normal[0]?.count || 0,
      totalStockValue: result[0]?.totalValue[0]?.value || 0,
    };
  }
}

export default ProductService;
