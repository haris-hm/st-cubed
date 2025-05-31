import { socket } from "./initSockets";

export const socketEvents = ({ setValue }) => {
	socket.on("update-start-countdown", ({ gameStartCountdown }) => {
		console.log("gameStartCountdown", gameStartCountdown);
		setValue((state) => {
			return { ...state, gameStartCountdown };
		});
	});

	socket.on("start-game", ({ roomID, players, currentTurn, currentTime }) => {
		setValue((state) => {
			return {
				...state,
				roomID,
				gameStarted: true,
				players,
				currentTurn,
				currentTime,
			};
		});
	});

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

			console.log(
				"update-board",
				currentTurn,
				currentBoardIndex,
				subGameStates,
				superBoardState,
			);
		},
	);
};
