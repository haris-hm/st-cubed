import { useNavigate } from "react-router-dom";
import { leaveRoom } from "../../util/socket/emit";
import { Button } from "../ui";

/**
 *
 * @param {Object} props - The props for the LeaveGameButton component.
 * @param {Function} props.onLeaveGame - Callback function to execute when the game is left. Takes no arguments.
 * @param {string} [props.className=""] - Optional additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} The rendered LeaveGameButton component.
 */
function LeaveGameButton({ onLeaveGame, className = "" }) {
	const navigate = useNavigate();

	function handleLeaveGame(success) {
		if (success) {
			navigate("/");
			onLeaveGame();
		}
	}

	return (
		<Button
			color="secondary"
			onClick={() => {
				leaveRoom(handleLeaveGame);
			}}
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
