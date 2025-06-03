import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { pageRouter } from './routes/page.routes.js';
import SocketService from './services/socket.service.js';
import { errorHandler } from './middleware/error.middleware.js';

// Initialize Express app
const app = express();

// Create HTTP server and attach Socket.IO
const httpServer = createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN, // Allowed frontend origin
        methods: ["GET", "POST"]
    }
});

// Make io instance available to routes
app.set('io', io);

// Initialize and configure socket service
const socketService = new SocketService(io);
socketService.initialize();

// Enable CORS for the Express app
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allowed frontend origin
    methods: ["GET", "POST"]
}));
app.use(express.json());

// API routes
app.use('/api', pageRouter);

// Error handling middleware
app.use(errorHandler);

// Export the HTTP server for use in index.js
export { httpServer };