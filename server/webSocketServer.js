import { Server } from 'socket.io';
import { createServer } from 'http';
import { SuperTicTacToe } from './game.js';

// This holds all roomIDs and their corresponding game instance
const currentGames = new Map();

/**
 * Generates a unique room ID.
 * Room IDs are a variation of the word Tic-Tac-Toe, where
 * the T's are replaced with the same random letter and the ending letter
 * of each word is replaced with a random letter.
 * 
 * @returns {string} A unique room ID.
 */
function generateRoomID() {
    const letters = 'BCDFGHJKLMNPQRSTVWXYZ';
    const start = letters.charAt(Math.floor(Math.random() * letters.length));
    const end = []

    for (let i = 0; i < 3; i++) {
        end.push(letters.charAt(Math.floor(Math.random() * letters.length)).toLowerCase());
    }

    const roomID = `${start}i${end[0]}-${start}a${end[1]}-${start}o${end[2]}`;
    return roomID;
}

function createSocketEndpoints(socket, io) {
    // DEBUG
    console.log(`New client connected: ${socket.id}`);

    socket.on('create-room', (callback) => {
        const roomID = generateRoomID();
        console.log(`Room created: ${roomID}`);
        const game = new SuperTicTacToe();
        currentGames.set(roomID, game);
        socket.join(roomID);
        callback(roomID);
    });

    socket.on('join-room', (roomID, callback) => {
        if (currentGames.has(roomID)) {
            socket.join(roomID);
            console.log(`Client joined room: ${roomID}`);
            callback(true);
        } else {
            console.log(`Room not found: ${roomID}`);
            callback(false);
        }
    });

    socket.on('make-move', (position, boardIndex, callback) => {
        const roomID = Array.from(socket.rooms)[1]; // Get the room ID from the socket's rooms
        const game = currentGames.get(roomID);

        if (game) {
            if (!game.getBoardIndex()){
                game.setBoardIndex(boardIndex);
            }

            game.makeMove(position);
            io.to(roomID).emit('board-state', game.getState()); // Use io here!
            callback(true);
        } else {
            console.log(`Game not found for room: ${roomID}`);
            callback(false);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        console.log(`Current games: ${currentGames.size}`);
    });

}

function createWebSocketServer(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173", // Vite dev server default
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => createSocketEndpoints(socket, io));

    return httpServer;
}

export { createWebSocketServer };