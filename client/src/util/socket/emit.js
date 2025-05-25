import { socket } from "./initSockets";

/**
 * Register a user with the server
 *
 * @param {string} discordId The discordId of the user
 * @param {string} username The username of the user
 */
export const registerUser = (discordId, username) => {
	socket.emit("register-user", { discordId, username });
};

/**
 * Creates a new room with the chosen settings
 *
 * @param {Object} roomInfo An object containing the room information
 * @param {string} roomInfo.discordId The discordId of the user registering the room
 * @param {string} roomInfo.username The username of the user registering the room
 * @param {string} roomInfo.gameMode The selected game mode
 * @param {number} roomInfo.timeLimit The selected time limit in seconds
 * @param {*} callback
 */
export const createRoom = (
	{ gameMode, timeLimit, discordId, username },
	callback,
) => {
	socket.emit(
		"create-room",
		{ gameMode, timeLimit, discordId, username },
		callback,
	);
};

export const joinRoom = (roomID, callback) => {
	socket.emit("join-room", { roomID }, callback);
};

export const makeMove = (boardIndex, position, callback) => {
	socket.emit("make-move", boardIndex, position, callback);
};
