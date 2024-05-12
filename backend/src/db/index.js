import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(
      `Mongoose connected successfully ✅ \nDB Name: ${connectionInstance.connections[0].name}`
    );
  } catch (error) {
    console.error('Failed to connect to DB! ❌', error);
  }
};

export { connectDB };
