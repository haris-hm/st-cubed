import { useParams } from "react-router-dom";

import RoomCode from "../components/game/RoomCode";

function GameRoom() {
	const { roomId } = useParams();

	return <RoomCode roomId={roomId}></RoomCode>;
}

export default GameRoom;
