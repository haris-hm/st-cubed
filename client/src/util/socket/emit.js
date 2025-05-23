import { socket } from "./initSockets";

export const createRoom = ({ gameMode, timeLimit }, callback) => {
	socket.emit("create-room", { gameMode, timeLimit }, callback);
};

export const makeMove = (boardIndex, position, callback) => {
	socket.emit("make-move", boardIndex, position, callback);
};
