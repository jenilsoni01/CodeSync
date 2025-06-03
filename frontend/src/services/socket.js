import { io } from 'socket.io-client';

// Get the Socket.IO server URL from environment variables
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// SocketService manages all socket client logic for the frontend
class SocketService {
    constructor() {
        this.socket = null;
        this.listeners = new Map();
        this.connectionListeners = new Map();
    }

    // Connect to the socket server for a specific page
    connect(pageId) {
        if (!pageId) {
            throw new Error('pageId is required for socket connection');
        }

        const isconnected = this.socket && this.socket.connected;
        if (isconnected) {
            console.warn('Socket is already connected. Disconnecting first.', this.socket.connected);
            this.disconnect();
        }

        this.socket = io(SOCKET_URL, {
            reconnectionDelayMax: 10000,// Maximum delay between reconnection attempts
            query: { pageId }
        });
        // console.log('Connecting to socket server:',`${SOCKET_URL}/socket.io`, 'with pageId:', pageId);

        // Store connection listeners for cleanup
        this.connectionListeners.set('connect', () => {
            console.log('Connected to socket server');
        });
        this.connectionListeners.set('disconnect', () => {
            console.log('Disconnected from socket server');
        });
        this.connectionListeners.set('error', (error) => {
            console.error('Socket connection error:', error);
        });
        this.connectionListeners.set('reconnect_attempt', (attemptNumber) => {
            console.log(`Attempting to reconnect (${attemptNumber})`);
        });
        this.connectionListeners.set('reconnect_failed', () => {
            console.error('Failed to reconnect to socket server');
        });

        // Add all connection listeners
        this.connectionListeners.forEach((callback, event) => {
            this.socket.on(event, callback);
        });

        // Listen for code updates from the server
        this.socket.on('codeUpdate', (data) => {
            // console.log('Received code update from server:', data);
            const listeners = this.listeners.get('codeUpdate') || [];
            listeners.forEach(callback => callback(data));
        });
    }

    // Disconnect from the socket server and clean up listeners
    disconnect() {
        if (this.socket) {
            // Remove all connection listeners
            this.connectionListeners.forEach((callback, event) => {
                this.socket.off(event, callback);
            });
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Register a callback for a specific event
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    // Remove a callback for a specific event
    off(event, callback) {
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    // Emit an event to the server
    emit(event, data) {
        if (!this.socket) {
            console.warn('Cannot emit event: Socket is not connected');
            return;
        }
        // console.log('Emitting event to server:', event, data);
        this.socket.emit(event, data);
    }
}

export const socketService = new SocketService();
export default socketService; 