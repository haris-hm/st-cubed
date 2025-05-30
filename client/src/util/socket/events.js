import { socket } from "./initSockets";

export const socketEvents = ({ setValue }) => {
	socket.on("update-start-countdown", ({ gameStartCountdown }) => {
		console.log("gameStartCountdown", gameStartCountdown);
		setValue((state) => {
			return { ...state, gameStartCountdown };
		});
	});

	socket.on("start-game", () => {
		console.log("game-started");
		setValue((state) => {
			return { ...state, gameStarted: true };
		});
	});
};
