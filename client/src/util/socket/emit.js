import { socket } from "./initSockets";

export const createRoom = (callback) => {
	socket.emit("create-room", callback);
};

export const makeMove = (boardIndex, position, callback) => {
	socket.emit("make-move", boardIndex, position, callback);
};
