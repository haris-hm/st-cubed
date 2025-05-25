import { createContext, useState, useEffect } from "react";
import { initSockets } from "../util/socket/initSockets";

// Code from https://alexboots.medium.com/using-react-context-with-socket-io-3b7205c86a6d

export const SocketContext = createContext({
	gameStartCountdown: null,
	gameStarted: false,
	room: null,
	boardState: null,
});

function SocketProvider({ children }) {
	const [value, setValue] = useState({
		room: null,
		boardState: null,
	});

	useEffect(() => {
		initSockets({ setValue });
	}, [initSockets]);

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
}

export default SocketProvider;
