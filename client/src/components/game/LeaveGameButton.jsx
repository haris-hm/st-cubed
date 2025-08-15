import { Button } from "../ui";
import { useLeaveGame } from "../../hooks/useLeaveGame";

/**
 *
 * @param {Object} props - The props for the LeaveGameButton component.
 * @param {Function} props.onLeaveGame - Callback function to execute when the game is left. Takes no arguments.
 * @param {string} [props.className=""] - Optional additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} The rendered LeaveGameButton component.
 */
function LeaveGameButton({ onLeaveGame, className = "" }) {
	const handleLeaveGame = useLeaveGame(onLeaveGame);

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
