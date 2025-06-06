import mongoose, { Document, Schema } from 'mongoose';

export interface IBloodInventory extends Document {
  bloodType: string;
  units: number;
  lastUpdated: Date;
  expiryDate: Date;
  status: 'available' | 'reserved' | 'expired';
  donorId?: mongoose.Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bloodInventorySchema = new Schema<IBloodInventory>({
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true,
    min: 0
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'reserved', 'expired'],
    default: 'available'
  },
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
bloodInventorySchema.index({ bloodType: 1, status: 1 });
bloodInventorySchema.index({ expiryDate: 1, status: 1 });

// Add a pre-save middleware to update status based on expiry date
bloodInventorySchema.pre('save', function(next) {
  if (this.expiryDate < new Date()) {
    this.status = 'expired';
  }
  next();
});

export const BloodInventory = mongoose.model<IBloodInventory>('BloodInventory', bloodInventorySchema); 