import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  condition: {
    type: String,
    required: true,
    enum: ['new', 'like_new', 'good', 'fair', 'poor']
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  sellerId: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: false
},
  status: {
    type: String,
    enum: ['active', 'sold', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  interestedCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
ItemSchema.index({ sellerId: 1 });
ItemSchema.index({ category: 1 });
ItemSchema.index({ status: 1 });
ItemSchema.index({ createdAt: -1 });
ItemSchema.index({ price: 1 });
ItemSchema.index({ title: 'text', description: 'text' });

export const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);
