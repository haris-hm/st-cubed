import { socket } from "./initSockets";

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

export const makeMove = (boardIndex, position, callback) => {
	socket.emit("make-move", boardIndex, position, callback);
};
