import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config.js';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    logger.info(
      `MongoDB connected ✅ !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error('MONGODB connection FAILED', error);
    process.exit(1);
  }
};

export default connectDB;
