import mongoose from 'mongoose';

const revenueLeakLogSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: [true, 'Lead ID is required'],
  },
  reason: {
    type: String,
    enum: ['no_reply', 'delayed_reply', 'no_followup', 'inactive'],
    required: [true, 'Reason is required'],
  },
  estimatedLoss: {
    type: Number,
    required: [true, 'Estimated loss is required'],
    min: [0, 'Loss cannot be negative'],
  },
  detectedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster tracking
revenueLeakLogSchema.index({ leadId: 1, detectedAt: -1 });

const RevenueLeakLog = mongoose.model('RevenueLeakLog', revenueLeakLogSchema);

export default RevenueLeakLog;
