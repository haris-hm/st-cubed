import { io } from "socket.io-client";
import { socketEvents } from "./events";

export const socket = io({
	path: "/.proxy/ws",
	transports: ["websocket"],
});

export const initSockets = ({ setValue }) => {
	socketEvents({ setValue });
};
