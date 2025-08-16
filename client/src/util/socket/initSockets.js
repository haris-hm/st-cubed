import { io } from "socket.io-client";
import { socketEvents } from "./events";

// Initialize the socket connection
export const socket = io({
	path: "/.proxy/ws",
	transports: ["websocket"],
});

// Initialize socket events
export function initSockets({ setValue }) {
	socketEvents({ setValue });
}

export function initialSocketState() {
	return {
		roomID: null,
		boardID: null,
		gameState: "waiting",
		gameStartCountdown: null,
		players: [],
		currentTurn: null,
		currentTime: null,
		boardState: {
			currentBoardIndex: -1,
			subGameStates: null,
			superBoardState: null,
		},
		winner: null,
		playAgain: {
			requestingPlayer: null,
			gameAbandoned: false,
			abandoningPlayerName: null,
		},
	};
}
