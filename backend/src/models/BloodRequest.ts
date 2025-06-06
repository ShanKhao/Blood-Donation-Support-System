import mongoose, { Document, Schema } from 'mongoose';

export interface IBloodRequest extends Document {
  patientName: string;
  bloodType: string;
  units: number;
  hospital: string;
  urgency: 'urgent' | 'normal';
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  requestDate: Date;
  requiredDate: Date;
  notes?: string;
  requestedBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bloodRequestSchema = new Schema<IBloodRequest>({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: {
    type: Number,
    required: true,
    min: 1
  },
  hospital: {
    type: String,
    required: true,
    trim: true
  },
  urgency: {
    type: String,
    required: true,
    enum: ['urgent', 'normal'],
    default: 'normal'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'fulfilled', 'rejected'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  requiredDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Add index for faster queries
bloodRequestSchema.index({ status: 1, urgency: 1 });
bloodRequestSchema.index({ bloodType: 1, status: 1 });

export const BloodRequest = mongoose.model<IBloodRequest>('BloodRequest', bloodRequestSchema); 