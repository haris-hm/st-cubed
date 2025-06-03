import { Button } from "../ui";

function LeaveGameButton({ onLeaveGame, className = "" }) {
	function handleLeaveGame() {}

	return (
		<Button
			color="secondary"
			onClick={handleLeaveGame}
			className={`h-full px-4 py-2 ${className}`}
		>
			<img
				src="/.proxy/icons/leave-game.svg"
				alt="Leave Game"
				className="size-10"
			/>
		</Button>
	);
}

export default LeaveGameButton;
