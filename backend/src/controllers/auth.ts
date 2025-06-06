import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { SystemLog } from '../models/SystemLog';
import mongoose from 'mongoose';

const generateToken = (userId: mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id: userId.toString() }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production', {
    expiresIn: '7d'
  });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name, role, phoneNumber, address, bloodType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      name,
      role,
      phoneNumber,
      address,
      bloodType
    });

    const savedUser = await newUser.save() as IUser;

    // Create system log
    await SystemLog.createLog('auth', `New user registered: ${email}`, savedUser._id, { role });

    // Generate token
    const token = generateToken(savedUser._id);

    res.status(201).json({
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        role: savedUser.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Create system log
    await SystemLog.createLog('auth', `User logged in: ${email}`, user._id);

    // Generate token
    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as IUser;
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
        bloodType: user.bloodType,
        lastDonation: user.lastDonation
      }
    });
  } catch (error) {
    next(error);
  }
}; 