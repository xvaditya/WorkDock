import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  sku: {
    type: String,
    unique: [true, 'SKU must be unique'],
    required: [true, 'SKU is required'],
    uppercase: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  costPrice: {
    type: Number,
    required: [true, 'Cost price is required'],
    min: [0, 'Cost price cannot be negative'],
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: [0, 'Selling price cannot be negative'],
  },
  currentStock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  minimumThreshold: {
    type: Number,
    default: 10,
    min: [0, 'Threshold cannot be negative'],
  },
  totalUnitsSold: {
    type: Number,
    default: 0,
  },
  totalRevenueGenerated: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field: profit per unit
productSchema.virtual('profitPerUnit').get(function () {
  return this.sellingPrice - this.costPrice;
});

// Virtual field: total profit
productSchema.virtual('totalProfit').get(function () {
  return this.profitPerUnit * this.totalUnitsSold;
});

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
