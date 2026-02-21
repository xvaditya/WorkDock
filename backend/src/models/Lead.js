import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lead name is required'],
    trim: true,
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
  },
  source: {
    type: String,
    enum: ['whatsapp', 'instagram', 'email', 'manual'],
    required: [true, 'Source is required'],
  },
  lastMessageTime: {
    type: Date,
    default: Date.now,
  },
  lastReplyTime: {
    type: Date,
    default: null,
  },
  estimatedDealValue: {
    type: Number,
    default: 0,
    min: [0, 'Deal value cannot be negative'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'followup', 'closed', 'lost'],
    default: 'new',
  },
  followUpCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual: Response time in hours
leadSchema.virtual('responseTimeHours').get(function () {
  if (!this.lastReplyTime) return null;
  const diff = new Date() - this.lastReplyTime;
  return Math.floor(diff / (1000 * 60 * 60));
});

// Virtual: Heat Score
leadSchema.virtual('heatScore').get(function () {
  if (!this.lastReplyTime) return 'COLD';
  const hoursAgo = this.responseTimeHours;
  if (hoursAgo < 1) return 'HOT';
  if (hoursAgo < 6) return 'WARM';
  return 'COLD';
});

leadSchema.set('toJSON', { virtuals: true });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
