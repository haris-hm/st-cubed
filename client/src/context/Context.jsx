/**
 * @file Exports the context objects for all global state management in the application.
 */

import { createContext } from "react";

export const DiscordSDKContext = createContext(null);

export const SocketContext = createContext({
	gameStartCountdown: null,
	gameStarted: false,
	room: null,
	boardState: null,
});
