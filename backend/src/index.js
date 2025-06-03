import dotenv from 'dotenv';
import { httpServer } from './app.js';
import connectDB from './db/index.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
        // Start HTTP server
        const PORT = process.env.PORT;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    httpServer.close(() => process.exit(1));
});




