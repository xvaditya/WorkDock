import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative'],
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
saleSchema.index({ productId: 1, soldAt: -1 });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
