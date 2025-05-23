import { Server } from 'socket.io';
import { createServer } from 'http';
import { Room, User, Player } from './room.js';

// This holds all roomIDs and their corresponding room instance
const currentRooms = new Map();

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
    // TODO: Remove all debug statements
    console.log(`New client connected: ${socket.id}`);

    socket.on('create-room', ({ gameMode, timeLimit, discordId, username }, callback) => {
        const roomID = generateRoomID();
        const room = new Room(roomID, gameMode, timeLimit);
        room.addPlayer(new Player(discordId, username, 'X'));
        currentRooms.set(roomID, room);

        console.log(`Room created: ${roomID}`);
        console.log(`   Game mode: ${gameMode}`);
        console.log(`   Time limit: ${timeLimit}`);
        console.log(`   Discord ID: ${discordId}`);
        console.log(`   Username: ${username}`);

        socket.join(roomID);
        callback(roomID);
    });

    socket.on('join-room', (roomID, callback) => {
        if (currentRooms.has(roomID)) {
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
        const game = currentRooms.get(roomID);

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
        console.log(`Current games: ${currentRooms.size}`);
    });

}

function createWebSocketServer(app) {
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        path: '/ws',
        cors: {
            origin: "*", 
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => createSocketEndpoints(socket, io));

    return httpServer;
}

export { createWebSocketServer };