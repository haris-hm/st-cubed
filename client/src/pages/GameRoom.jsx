import { useParams } from "react-router-dom";

function GameRoom() {
	const { roomId } = useParams();
	console.log("GameRoom component rendered with roomId:", roomId);

	return (
		<div>
			<h1>GameRoom</h1>
			<p>Welcome to the GameRoom page!</p>
			<p>This is a simple React application.</p>
			<p>Room ID: {roomId}</p>
		</div>
	);
}

export default GameRoom;
