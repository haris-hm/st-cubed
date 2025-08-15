import { Socket, Server } from "socket.io";

import logger from "../../models/logger.js";
import { Room } from "../../models/room.js";
import { User } from "../../models/user.js";

/**
 * Event to create a new user and register them in a map.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Socket} context.socket - The socket object for the current connection.
 * @param {Map<string, User>} context.currentUsers - Map to store information about currently connected users.
 *
 * @param {Object} data - The data sent from the client.
 * @param {string} data.discordId - The Discord ID of the user.
 * @param {string} data.username - The username of the user.
 * @param {string} data.avatarHash - The avatar hash of the user.
 *
 * @param {Function} callback - An optional function that, if specified, will be called with a boolean indicating success or failure.
 */
function registerUser(
	{ socket, currentUsers },
	{ discordId, username, displayName, avatarHash },
	callback = () => {},
) {
	if (
		discordId === undefined ||
		username === undefined ||
		discordId === undefined ||
		avatarHash === undefined
	) {
		logger.error(
			{
				userID: discordId,
				username: username,
				displayName: displayName,
				avatarHash: avatarHash,
			},
			"Invalid user data",
		);
		callback(false);
		return;
	}

	const user = new User(
		discordId,
		socket.id,
		username,
		displayName,
		avatarHash,
	);
	currentUsers.set(socket.id, user);
	callback(true);
}

/**
 * Event to create a new room and add the user as the first player.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Socket} context.socket - The socket object for the current connection.
 * @param {Map<string, User>} context.currentUsers - Map to store information about currently connected users.
 * @param {Map<string, Room>} context.currentRooms - Map to store information about currently active rooms.
 *
 * @param {Object} data - The data sent from the client.
 * @param {number} data.gameMode - The game mode for the room.
 * @param {number} data.timeLimit - The time limit for the game in seconds.
 * @param {string} data.discordId - The Discord ID of the user creating the room.
 * @param {string} data.username - The username of the user creating the room.
 *
 * @param {Function} callback - A function that will be called with the room ID when the room is created. If there is
 * an error during room creation, it will be called with null.
 */
function createRoom(
	{ socket, io, currentUsers, currentRooms },
	{ gameMode, timeLimit, discordId, username },
	callback,
) {
	if (
		gameMode === undefined ||
		timeLimit === undefined ||
		discordId === undefined ||
		username === undefined
	) {
		logger.error(
			{
				gameMode: gameMode,
				timeLimit: timeLimit,
				userID: discordId,
				username: username,
			},
			"Invalid room data:",
		);
		callback(null);
		return;
	}

	const socketId = socket.id;
	const user = currentUsers.get(socketId);
	const room = new Room(gameMode, timeLimit);
	const roomID = room.getID();

	socket.join(roomID);
	room.addPlayer(io, user);
	user.joinRoom(roomID);
	currentRooms.set(roomID, room);

	logger.info(
		{
			roomID: roomID,
			userID: discordId,
			username: username,
			gameMode: gameMode,
			timeLimit: `${timeLimit}${timeLimit === "unlimited" ? "" : " seconds"}`,
		},
		`Room created by user ${username}`,
	);

	callback(roomID);
}

/**
 * Event to join an existing room.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Socket} context.socket - The socket object for the current connection.
 * @param {Server} context.io - The Socket.IO server instance.
 * @param {Map<string, Room>} context.currentRooms - Map to store information about currently active rooms.
 *
 * @param {Object} data - The data sent from the client.
 * @param {string} data.roomID - The ID of the room to join.
 *
 * @param {Function} callback - A function that will be called with a boolean indicating success or failure when adding the user to the room.
 */
function joinRoom(
	{ socket, io, currentRooms, currentUsers },
	{ roomID },
	callback,
) {
	if (!roomID) {
		logger.error({ roomID: roomID }, "Unspecified roomID");
		callback(false);
		return;
	}

	const socketId = socket.id;
	const user = currentUsers.get(socketId);
	const room = currentRooms.get(roomID);

	if (!room) {
		logger.error({ roomID: roomID }, "Room not found");
		callback(false);
	}

	socket.join(roomID);

	if (room.getPlayerCount() < 2) {
		room.addPlayer(io, user);
	} else {
		room.addSpectator(io, user);
	}

	user.joinRoom(roomID);

	callback(true);

	logger.info({ roomID: roomID, socketID: socketId }, "Client joined room");
}

/**
 * Validate if a room ID is valid by checking if it exists in the currentRooms map.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Map<string, Room>} context.currentRooms - Map to store information about currently active rooms.
 *
 * @param {Object} data - The data sent from the client.
 * @param {string} data.roomID - The ID of the room to validate.
 *
 * @param {Function} callback - A required function that will be called with a boolean indicating whether the room ID is valid.
 */
function validateRoomID({ currentRooms }, { roomID }, callback) {
	const room = currentRooms.get(roomID);

	if (room) {
		callback(true);
	}

	callback(false);
}

/**
 * Event to make a move in the game.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Socket} context.socket - The socket object for the current connection.
 * @param {Server} context.io - The Socket.IO server instance.
 * @param {Map<string, Room>} - context.currentRooms Map to store information about currently active rooms.
 * @param {Map<string, User>} - context.currentUsers Map to store information about currently connected users.
 *
 * @param {Object} data - The data sent from the client.
 * @param {string} data.userID - The ID of the user making the move.
 * @param {number} data.boardIndex - The index of the board where the move is being made.
 * @param {number} data.position - The position on the subboard where the move is being made.
 *
 * @param {Function} callback - A required function that will be called with a boolean indicating success or failure of the move.
 */
function makeMove(
	{ io, socket, currentRooms, currentUsers },
	{ userID, boardIndex, position },
	callback,
) {
	const user = currentUsers.get(socket.id);

	let roomID;
	try {
		roomID = user.getCurrentRoom();
	} catch (error) {
		logger.error(
			{ userID: userID, error: error.message },
			"Error getting current room for user",
		);
		callback(false);
		return;
	}

	logger.debug(
		{
			roomID: roomID,
			userID: userID,
			boardIndex: boardIndex,
			position: position,
		},
		"Making move",
	);

	const room = currentRooms.get(roomID);
	room.makeMove(io, userID, boardIndex, position);
}

/**
 * Event to leave a room and remove the user from the game.
 *
 * @param {Object} context - Context object containing shared resources.
 * @param {Socket} context.socket - The socket object for the current connection.
 * @param {Server} context.io - The Socket.IO server instance.
 * @param {Map<string, User>} context.currentUsers - Map to store information about currently connected users.
 * @param {Map<string, Room>} context.currentRooms - Map to store information about currently active rooms.
 *
 * @param {Function} callback - A required function that will be called with a boolean indicating success or failure of leaving the game.
 * @param {boolean} [disconnected=false] - Optional flag indicating if the user disconnected completely from the activity.
 * @returns
 */
function leaveRoom(
	{ socket, io, currentUsers, currentRooms },
	callback,
	disconnected = false,
) {
	const user = currentUsers.get(socket.id);

	if (!user) {
		logger.error({ socketID: socket.id }, "User not found");
		callback(false);
		return;
	}

	const roomID = user.getCurrentRoom();

	if (!roomID) {
		logger.error({ socketID: socket.id }, "User not in a room");
		callback(false);
		return;
	}

	socket.leave(roomID);

	const room = currentRooms.get(roomID);
	if (!room) {
		logger.error({ roomID: roomID }, "Room not found");
		callback(false);
		return;
	}

	const { success, playerCount } = room.handlePlayerLeave(
		io,
		user.getDiscordId(),
	);

	if (disconnected) {
		currentUsers.delete(socket.id);
	}

	if (success) {
		logger.info(
			{ roomID: roomID, userID: user.getDiscordId() },
			"User left the game",
		);

		if (playerCount === 0) {
			currentRooms.delete(roomID);
			logger.info({ roomID: roomID }, "Room deleted due to no players");
		}
		callback(true);
	}

	callback(false);
}

function requestPlayAgain(
	{ socket, io, currentUsers, currentRooms },
	callback,
) {
	const socketId = socket.id;
	const user = currentUsers.get(socketId);

	if (!user) {
		logger.error({ socketID: socket.id }, "User not found");
		callback(false);
		return;
	}

	const roomID = user.getCurrentRoom();

	if (!roomID) {
		logger.error({ socketID: socket.id }, "User not in a room");
		callback(false);
		return;
	}

	const room = currentRooms.get(roomID);
	if (!room) {
		logger.error({ roomID: roomID }, "Room not found");
		callback(false);
		return;
	}

	room.handlePlayAgainRequest(io, user.getDiscordId());
	callback(true);
}

export {
	registerUser,
	createRoom,
	joinRoom,
	validateRoomID,
	makeMove,
	leaveRoom,
	requestPlayAgain,
};
