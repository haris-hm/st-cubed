import { Server } from "socket.io";
import { createServer } from "http";

import logger from "../models/logger.js";
import {
	registerUser,
	createRoom,
	joinRoom,
	validateRoomID,
	makeMove,
} from "./socket/events.js";

// This holds all socketIds and their corresponding room instance
const CURRENT_ROOMS = new Map();
// This holds all socketIds and their corresponding user instance
const CURRENT_USERS = new Map();

function createSocketEndpoints(socket, io) {
	logger.info({ socketID: socket.id }, "New client connected to websocket");

	const context = {
		socket: socket,
		io: io,
		currentRooms: CURRENT_ROOMS,
		currentUsers: CURRENT_USERS,
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

	socket.on("make-move", (data, callback) => {
		makeMove(context, data, callback);
	});

	socket.on("validate-room-id", (data, callback) => {
		validateRoomID(context, data, callback);
	});

	socket.on("disconnect", () => {
		logger.info(
			{ socketID: socket.id },
			"Client disconnected from websocket",
		);
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
