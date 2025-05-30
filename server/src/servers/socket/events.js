import { Socket, Server } from "socket.io";

import logger from "../../models/logger.js";
import { Room } from "../../models/room.js";
import { User } from "../../models/user.js";
import { emitGameStartSequence } from "./emit.js";

/**
 * Event to create a new user and register them in a map.
 *
 * @param {Object} context Context object containing shared resources.
 * @param {Socket} context.socket The socket object for the current connection.
 * @param {Map<string, User>} context.currentUsers Map to store information about currently connected users.
 *
 * @param {Object} data The data sent from the client.
 * @param {string} data.discordId The Discord ID of the user.
 * @param {string} data.username The username of the user.
 * @param {string} data.avatarHash The avatar hash of the user.
 *
 * @param {Function} callback An optional function that, if specified, will be called with a boolean indicating success or failure.
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
 * @param {Object} context Context object containing shared resources.
 * @param {Socket} context.socket The socket object for the current connection.
 * @param {Map<string, User>} context.currentUsers Map to store information about currently connected users.
 * @param {Map<string, Room>} context.currentRooms Map to store information about currently active rooms.
 *
 * @param {Object} data The data sent from the client.
 * @param {number} data.gameMode The game mode for the room.
 * @param {number} data.timeLimit The time limit for the game in seconds.
 * @param {string} data.discordId The Discord ID of the user creating the room.
 * @param {string} data.username The username of the user creating the room.
 *
 * @param {Function} callback A function that will be called with the room ID when the room is created. If there is
 * an error during room creation, it will be called with null.
 */
function createRoom(
	{ socket, currentUsers, currentRooms },
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

	room.addPlayer(user.getPlayer("X"));
	socket.join(roomID);
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
 * @param {Object} context Context object containing shared resources.
 * @param {Socket} context.socket The socket object for the current connection.
 * @param {Server} context.io The Socket.IO server instance.
 * @param {Map<string, Room>} context.currentRooms Map to store information about currently active rooms.
 *
 * @param {Object} data The data sent from the client.
 * @param {string} data.roomID The ID of the room to join.
 *
 * @param {Function} callback A function that will be called with a boolean indicating success or failure when adding the user to the room.
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

	room.addPlayer(user.getPlayer("O"));
	socket.join(roomID);

	callback(true);
	emitGameStartSequence({ io, currentRooms, roomID });

	logger.info({ roomID: roomID, socketID: socketId }, "Client joined room");
}

/**
 * Valudate if a room ID is valid by checking if it exists in the currentRooms map.
 *
 * @param {Object} context
 * @param {Map<string, Room>} context.currentRooms Map to store information about currently active rooms.
 *
 * @param {Object} data The data sent from the client.
 * @param {string} data.roomID The ID of the room to validate.
 *
 * @param {Function} callback A required function that will be called with a boolean indicating whether the room ID is valid.
 */
function validateRoomID({ currentRooms }, { roomID }, callback) {
	const room = currentRooms.get(roomID);

	if (room) {
		callback(true);
	}

	callback(false);
}

export { registerUser, createRoom, joinRoom, validateRoomID };
