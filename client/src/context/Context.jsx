/**
 * @file Exports the context objects for all global state management in the application.
 */

import { createContext } from "react";

export const DiscordSDKContext = createContext(null);

export const SocketContext = createContext({
	roomID: null,
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
});
