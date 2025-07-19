import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, {
  timestamps: true
});

// Compound index to ensure unique user-item combinations
CartItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });
CartItemSchema.index({ userId: 1 });

export const CartItem = mongoose.models.CartItem || mongoose.model<ICartItem>('CartItem', CartItemSchema);