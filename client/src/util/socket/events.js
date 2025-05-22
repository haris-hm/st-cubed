import { socket } from "./initSockets";

export const socketEvents = ({ setValue }) => {
	socket.on("board-state", ({ boardState }) => {
		setValue((state) => {
			return { ...state, boardState };
		});
	});
};
