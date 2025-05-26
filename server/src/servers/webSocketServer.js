import { Server } from "socket.io";
import { createServer } from "http";

import logger from "../models/logger.js";
import { registerUser, createRoom, joinRoom } from "./socket/events.js";

// This holds all socketIds and their corresponding room instance
const currentRooms = new Map();
// This holds all socketIds and their corresponding user instance
const currentUsers = new Map();

function createSocketEndpoints(socket, io) {
	logger.info(`New client connected to websocket: ${socket.id}`);

	const context = {
		socket,
		io,
		currentRooms,
		currentUsers,
	};

	socket.on("register-user", (data, callback = null) => {
		if (callback) {
			registerUser(context, data, callback);
		}

		registerUser(context, data);
	});

	socket.on("create-room", (data, callback = () => {}) => {
		createRoom(context, data, callback);
	});

	socket.on("join-room", (data, callback = () => {}) => {
		joinRoom(context, data, callback);
	});

	socket.on("disconnect", () => {
		logger.info(`Client disconnected from websocket: ${socket.id}`);
	});
}

function createWebSocketServer(app) {
	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		path: "/ws",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	io.on("connection", (socket) => createSocketEndpoints(socket, io));

	return httpServer;
}

export { createWebSocketServer };
