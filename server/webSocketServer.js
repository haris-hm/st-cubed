import { Server } from 'socket.io';
import { createServer } from 'http';
import { SuperTicTacToe } from './game.js';

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
        const game = new SuperTicTacToe();
        console.log('a user connected');
        game.setBoardIndex(0);
        game.makeMove(3);
        console.log(game.getState());
    });

    io.on('disconnect', (socket) => {
        console.log('user disconnected');
    });

    return httpServer;
}

export { createWebSocketServer };