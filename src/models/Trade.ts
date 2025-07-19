import mongoose, { Document, Schema } from 'mongoose';

export interface ITrade extends Document {
  _id: string;
  itemId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  offerPrice?: number;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema = new Schema<ITrade>({
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  offerPrice: {
    type: Number,
    min: 0
  },
  message: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
TradeSchema.index({ buyerId: 1 });
TradeSchema.index({ sellerId: 1 });
TradeSchema.index({ itemId: 1 });
TradeSchema.index({ status: 1 });
TradeSchema.index({ createdAt: -1 });

export const Trade = mongoose.models.Trade || mongoose.model<ITrade>('Trade', TradeSchema);