// SocketService handles all real-time socket communication logic
class SocketService {
    // Constructor initializes the socket.io instance
    constructor(io) {
        this.io = io;
        this.rooms = new Map();
    }

    // Initialize socket event listeners
    initialize() {
        this.io.on('connection', (socket) => {
            const { pageId } = socket.handshake.query;
            
            if (pageId) {
                // Join the room for this page
                socket.join(pageId);
                console.log(`Client connected to page: ${pageId}`);

                // Listen for code updates from this client
                socket.on('codeUpdate', (data) => {
                    // Broadcast the update to all clients in the room except sender
                    socket.to(pageId).emit('codeUpdate', data);
                });

                // Handle client disconnection
                socket.on('disconnect', () => {
                    console.log(`Client disconnected from page: ${pageId}`);
                });
            }
        });
    }

    // Emit an event to all clients in a specific room
    emitToRoom(roomId, event, data) {
        this.io.to(roomId).emit(event, data);
    }
}

export default SocketService; 