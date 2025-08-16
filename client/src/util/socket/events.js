import { socket, initialSocketState } from "./initSockets";

export const socketEvents = ({ setValue }) => {
	socket.on("update-start-countdown", ({ gameStartCountdown }) => {
		console.log("gameStartCountdown", gameStartCountdown);
		setValue((state) => {
			return { ...state, gameStartCountdown };
		});
	});

	socket.on(
		"start-game",
		({ roomID, boardID, gameState, players, currentTurn, currentTime }) => {
			setValue((state) => {
				return {
					...state,
					roomID,
					boardID,
					gameState,
					players,
					currentTurn,
					currentTime,
				};
			});
		},
	);

	socket.on(
		"update-board",
		({
			currentTurn,
			currentBoardIndex,
			subGameStates,
			superBoardState,
		}) => {
			setValue((state) => {
				return {
					...state,
					currentTurn,
					boardState: {
						currentBoardIndex,
						subGameStates,
						superBoardState,
					},
				};
			});
		},
	);

	socket.on(
		"pause-game",
		({ gameState, currentTurn, gameStartCountdown, players }) => {
			setValue((state) => {
				return {
					...state,
					gameState,
					currentTurn,
					gameStartCountdown,
					players,
				};
			});
		},
	);

	socket.on(
		"resume-game",
		({ gameState, currentTurn, players, currentTime }) => {
			setValue((state) => {
				return {
					...state,
					gameState,
					currentTurn,
					players,
					currentTime,
				};
			});
		},
	);

	socket.on("game-finished", ({ gameState, winner }) => {
		setValue((state) => {
			return { ...state, gameState, winner };
		});
	});

	socket.on("request-new-round", ({ playAgain }) => {
		setValue((state) => {
			return { ...state, playAgain };
		});
	});

	socket.on("reset-game", () => {
		setValue((state) => {
			return { ...state, ...initialSocketState() };
		});
	});

	socket.on("game-abandoned", ({ playAgain }) => {
		setValue((state) => {
			return { ...state, playAgain };
		});
	});
};
