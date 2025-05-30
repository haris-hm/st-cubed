import { socket } from "./initSockets";

/**
 * Register a user with the server
 *
 * @param {string} discordId The discordId of the user
 * @param {string} username The username of the user
 * @param {string} displayName The display name of the user
 * @param {string} avatarHash The avatar hash of the user
 */
function registerUser(discordId, username, displayName, avatarHash) {
	console.log("Emitting register-user:", {
		discordId,
		username,
		displayName,
		avatarHash,
	});
	socket.emit("register-user", {
		discordId,
		username,
		displayName,
		avatarHash,
	});
}

/**
 * Creates a new room with the chosen settings
 *
 * @param {Object} roomInfo - An object containing the room information
 * @param {string} roomInfo.discordId - The discordId of the user registering the room
 * @param {string} roomInfo.username - The username of the user registering the room
 * @param {string} roomInfo.gameMode - The selected game mode
 * @param {number} roomInfo.timeLimit - The selected time limit in seconds
 * @param {Function} callback - A callback function to handle the server's response.
 * The callback should accept one parameter, which is either a string containing the room ID
 * if successful, or null if there was an error.
 */
function createRoom({ gameMode, timeLimit, discordId, username }, callback) {
	socket.emit(
		"create-room",
		{ gameMode, timeLimit, discordId, username },
		callback,
	);
}

/**
 * Validates the specified ID with the server to check if it is a valid room ID.
 *
 * @param {string} roomID - The ID to validate.
 * @param {Function} callback - A callback function to handle the server's response.
 * Should accept one parameter, which is a boolean indicating whether the ID is valid.
 */
function validateRoomID(roomID, callback) {
	socket.emit("validate-room-id", { roomID }, callback);
}

/**
 * Joins the room with the specified ID.
 *
 * @param {string} roomID = The ID of the room to join.
 * @param {Function} callback - A callback function to handle the server's response.
 */
function joinRoom(roomID, callback) {
	socket.emit("join-room", { roomID }, callback);
}

export { registerUser, createRoom, validateRoomID, joinRoom };
