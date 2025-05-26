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
