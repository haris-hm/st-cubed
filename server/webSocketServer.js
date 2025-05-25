import { Server } from 'socket.io';
import { createServer } from 'http';
import { Room, User, Player } from './room.js';
import { count } from 'console';
import { create } from 'domain';

// This holds all socketIds and their corresponding room instance
const currentRooms = new Map();
// This holds all socketIds and their corresponding user instance
const currentUsers = new Map();

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

function emitGameStartSequence(io, roomID) {
    const room = currentRooms.get(roomID);
    let countdown = 10;

    const emissionInterval = setInterval(() => {
        if (countdown == 0) {
            clearInterval(emissionInterval);
            io.to(roomID).emit('start-game');
            room.startGame();
        }

        io.to(roomID).emit('update-start-countdown', { gameStartCountdown: countdown });
        console.log(`Countdown: ${countdown}`);
        countdown--;
    }, 1000);
}

/**
 * Registers a user with their Discord ID and username.
 * This is used to identify the user in the game.
 * 
 * @param {Object} data - The data object containing the Discord ID and username.
 * @param {string} data.discordId - The Discord ID of the user.
 * @param {string} data.username - The username of the user.
 * @param {Function} callback - The callback function to be called after registration.
 */
function registerUser(socket, io, {discordId, username}, callback) {
    const user = new User(discordId, username);
    currentUsers.set(socket.id, user);
    callback(true);
}

function createRoom(socket, io, { gameMode, timeLimit, discordId, username }, callback) {
    const socketId = socket.id;
    const user = currentUsers.get(socketId);
    const roomID = generateRoomID();
    const room = new Room(roomID, gameMode, timeLimit);

    room.addPlayer(user.getPlayer('X'));
    socket.join(roomID);
    currentRooms.set(roomID, room);

    console.log(`Room created: ${roomID}`);
    console.log(`   Game mode: ${gameMode}`);
    console.log(`   Time limit: ${timeLimit}`);
    console.log(`   Discord ID: ${discordId}`);
    console.log(`   Username: ${username}`);
    
    callback(roomID);
}

function joinRoom(socket, io, { roomID }, callback) {
    const socketId = socket.id;
    const user = currentUsers.get(socketId);
    console.log(roomID)
    const room = currentRooms.get(roomID);
    

    if (!room) {
        callback(false);
    }

    room.addPlayer(user.getPlayer('O'));
    socket.join(roomID);

    callback(true);
    emitGameStartSequence(io, roomID);
    
    console.log(`Client joined room: ${roomID}`);
}

function validateRoomID(socket, io, { roomID }, callback) {
    const room = currentRooms.get(roomID);
    if (room) {
        callback(true);
    }
    
    callback(false);
}

function createSocketEndpoints(socket, io) {
    // TODO: Remove all debug statements
    console.log(`New client connected: ${socket.id}`);

    socket.on('register-user', (data, callback = () => {}) => {
        registerUser(socket, io, data, callback);
    });

    socket.on('create-room', (data, callback = () => {}) => {
        createRoom(socket, io, data, callback);
    });

    socket.on('join-room', (data, callback = () => {}) => {
        joinRoom(socket, io, data, callback);
    });

    socket.on('validate-room-id', (data, callback) => {
        validateRoomID(socket, io, data, callback);
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