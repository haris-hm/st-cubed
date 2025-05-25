import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import RoomCode from "../components/game/RoomCode";

import { SocketContext } from "../context/SocketProvider";

function GameRoom() {
	const { roomId } = useParams();
	const { gameStarted, gameStartCountdown } = useContext(SocketContext);
	// const [waitingForPlayers, setWaitingForPlayers] = useState(true);

	if (!gameStarted) {
		return (
			<RoomCode roomId={roomId} countdown={gameStartCountdown}></RoomCode>
		);
	}

	return (
		<div>
			<h1>Game Room</h1>
			<p>Room ID: {roomId}</p>
			<p>Waiting for players...</p>
		</div>
	);
}

export default GameRoom;
