import { Server } from 'socket.io';
import { createServer } from 'http';

function createWebSocketServer(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173", // Vite dev server default
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    io.on('disconnect', (socket) => {
        console.log('user disconnected');
    });

    return httpServer;
}

export { createWebSocketServer };