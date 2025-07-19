import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Only required if not a Google user
    },
    minlength: 6
  },
  googleId: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  location: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalTrades: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

UserSchema.index({ email: 1 });
UserSchema.index({ rating: -1 });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
