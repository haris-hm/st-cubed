import { socket } from "./initSockets";

export const socketEvents = ({ setValue }) => {
	socket.on("update-start-countdown", ({ gameStartCountdown }) => {
		console.log("gameStartCountdown", gameStartCountdown);
		setValue((state) => {
			return { ...state, gameStartCountdown };
		});
	});

	socket.on("start-game", ({ players, currentTurn, currentTime }) => {
		console.log(
			`Start game event received: players: ${players}, currentTurn: ${currentTurn}, currentTime: ${currentTime}`,
		);
		setValue((state) => {
			return {
				...state,
				gameStarted: true,
				players,
				currentTurn,
				currentTime,
			};
		});
	});
};
