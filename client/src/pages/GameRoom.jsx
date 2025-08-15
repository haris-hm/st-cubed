import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Board, GameEndModal, RoomCode } from "../components/game";
import { Background } from "../components/ui";

import { SocketContext } from "../context/Context";

/**
 * Renders a GameRoom page component. Game logic still needs to be implemented.
 *
 * @returns {JSX.Element} The GameRoom page component.
 */
function GameRoom() {
	const { roomId } = useParams();
	const { gameState, gameStartCountdown, boardID } =
		useContext(SocketContext);

	return (
		<Background>
			<RoomCode
				roomId={roomId}
				countdown={gameStartCountdown}
				heading={
					gameState === "waiting"
						? "Waiting for a friend..."
						: "Game is paused"
				}
				state={gameState}
				className={`z-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
			/>
			<GameEndModal
				className={`z-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
			/>
			<Board key={boardID} />
		</Background>
	);
}

export default GameRoom;
