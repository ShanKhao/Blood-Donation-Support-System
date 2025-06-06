import mongoose from 'mongoose';
import { User } from '../models/User';
import { SystemLog } from '../models/SystemLog';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-donation';

const defaultAdmin = {
  email: 'admin@blooddonation.com',
  password: 'Admin@123', // This will be hashed by the User model's pre-save hook
  name: 'System Administrator',
  role: 'admin' as const,
  phoneNumber: '+1234567890',
  address: 'System Headquarters',
  bloodType: 'O+'
};

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: defaultAdmin.email });
    if (existingAdmin) {
      console.log('Default admin user already exists');
      return;
    }

    // Create admin user
    const admin = new User(defaultAdmin);
    await admin.save();

    // Create system log
    await SystemLog.createLog(
      'system',
      'Default admin user created',
      admin._id,
      { type: 'seed', action: 'create_admin' }
    );

    console.log('Default admin user created successfully');
    console.log('Email:', defaultAdmin.email);
    console.log('Password:', defaultAdmin.password);
    console.log('\nPlease change the default password after first login!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed function
seed(); 