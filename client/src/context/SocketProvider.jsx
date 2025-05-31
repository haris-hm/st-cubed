import { useState, useEffect } from "react";
import { initSockets } from "../util/socket/initSockets";
import { SocketContext } from "./Context";

/**
 * SocketProvider component initializes the socket connection and provides
 * the socket context to its children components.
 *
 * Code for client-side socket management inspired by
 * https://alexboots.medium.com/using-react-context-with-socket-io-3b7205c86a6d
 *
 * @param {Object} props - The props for the SocketProvider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the socket context.
 *
 * @returns {JSX.Element} - The SocketProvider component that provides socket context to its children.
 */
function SocketProvider({ children }) {
	const [value, setValue] = useState({
		roomID: null,
		gameStarted: false,
		players: [],
		currentTurn: null,
		currentTime: null,
		boardState: null,
	});

	useEffect(() => {
		initSockets({ setValue });
	}, []);

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
}

export default SocketProvider;
