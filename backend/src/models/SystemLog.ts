import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISystemLog extends Document {
  type: 'auth' | 'blood_request' | 'inventory' | 'user' | 'system';
  message: string;
  userId?: mongoose.Types.ObjectId;
  metadata?: Record<string, unknown>;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface ISystemLogModel extends Model<ISystemLog> {
  createLog(
    type: ISystemLog['type'],
    message: string,
    userId?: mongoose.Types.ObjectId,
    metadata?: Record<string, unknown>
  ): Promise<ISystemLog>;
}

const systemLogSchema = new Schema<ISystemLog, ISystemLogModel>({
  type: {
    type: String,
    required: true,
    enum: ['auth', 'blood_request', 'inventory', 'user', 'system']
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: {
    type: Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
systemLogSchema.index({ type: 1, timestamp: -1 });
systemLogSchema.index({ userId: 1, timestamp: -1 });

// Add a method to create a log entry
systemLogSchema.static('createLog', async function(
  type: ISystemLog['type'],
  message: string,
  userId?: mongoose.Types.ObjectId,
  metadata?: Record<string, unknown>
): Promise<ISystemLog> {
  return this.create({
    type,
    message,
    userId,
    metadata,
    timestamp: new Date()
  });
});

export const SystemLog = mongoose.model<ISystemLog, ISystemLogModel>('SystemLog', systemLogSchema); 