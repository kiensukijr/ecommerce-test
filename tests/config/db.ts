import mongoose from 'mongoose';
import { loadEnv } from './evn';


loadEnv()

export const connectDB = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    const conn = await mongoose.connect(mongodbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error('Error connecting to MongoDB:', error);
    }
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('MongoDB Disconnected');
};

