/**
 * @file Exports the context objects for all global state management in the application.
 */

import { createContext } from "react";

export const DiscordSDKContext = createContext(null);

export const SocketContext = createContext({
	roomID: null,
	gameStarted: false,
	players: [],
	currentTurn: null,
	currentTime: null,
	boardState: null,
});
