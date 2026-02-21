import SalesService from '../services/salesService.js';

class SalesController {
  static async createSale(req, res, next) {
    try {
      const { productId, quantity, totalAmount } = req.body;
      const sale = await SalesService.createSale(productId, quantity, totalAmount);
      res.status(201).json({
        success: true,
        data: sale,
        message: 'Sale created and stock updated',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllSales(req, res, next) {
    try {
      const sales = await SalesService.getAllSales();
      res.status(200).json({
        success: true,
        data: sales,
        count: sales.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSalesByProduct(req, res, next) {
    try {
      const sales = await SalesService.getSalesByProduct(req.params.productId);
      res.status(200).json({
        success: true,
        data: sales,
        count: sales.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSalesMetrics(req, res, next) {
    try {
      const metrics = await SalesService.getSalesMetrics();
      res.status(200).json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTopSellingProducts(req, res, next) {
    try {
      const limit = req.query.limit || 10;
      const products = await SalesService.getTopSellingProducts(parseInt(limit));
      res.status(200).json({
        success: true,
        data: products,
        count: products.length,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SalesController;
