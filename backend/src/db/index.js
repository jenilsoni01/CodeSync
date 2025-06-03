import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // 
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

export default connectDB; 
