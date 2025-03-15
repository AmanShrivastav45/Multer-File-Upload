import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("MONGO_URI is not defined in .env");
        await mongoose.connect(uri);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};
