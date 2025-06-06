import { useContext } from "react";
import { useParams } from "react-router-dom";

import { RoomCode, Board } from "../components/game";
import { Background } from "../components/ui";

import { SocketContext } from "../context/Context";

/**
 * Renders a GameRoom page component. Game logic still needs to be implemented.
 *
 * @returns {JSX.Element} The GameRoom page component.
 */
function GameRoom() {
	const { roomId } = useParams();
	const { gameStarted, gameStartCountdown } = useContext(SocketContext);

	if (!gameStarted) {
		return (
			<RoomCode roomId={roomId} countdown={gameStartCountdown}></RoomCode>
		);
	}

	return (
		<Background>
			<Board />
		</Background>
	);
}

export default GameRoom;
