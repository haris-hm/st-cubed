import { useContext, useMemo } from "react";

import { Button, Modal } from "../ui";
import { useLeaveGame } from "../../hooks/useLeaveGame";
import { SocketContext, DiscordSDKContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";
import { requestPlayAgain } from "../../util/socket/emit";

function GameEndModal({ className = "" }) {
	const handleLeaveGame = useLeaveGame();
	const {
		gameState,
		winner,
		playAgain: { requestingPlayer, gameAbandoned, abandoningPlayerName },
	} = useContext(SocketContext);
	const { auth } = useContext(DiscordSDKContext);

	const userID = getUserId(auth);

	const { playAgainDisabled, playAgainContents } = useMemo(() => {
		if (gameAbandoned) {
			return {
				playAgainDisabled: true,
				playAgainContents: (
					<h2 className="text-modal-gray text-sm font-normal">
						{`${abandoningPlayerName.displayName} has left the game`}
					</h2>
				),
			};
		}
		if (requestingPlayer) {
			return {
				playAgainDisabled: requestingPlayer.discordId === userID,
				playAgainContents: (
					<h2 className="text-modal-gray text-base font-normal">
						Requested by {requestingPlayer.displayName}
					</h2>
				),
			};
		}
		return { playAgainDisabled: false, playAgainContents: null };
	}, [abandoningPlayerName, gameAbandoned, requestingPlayer, userID]);

	function handlePlayAgain() {
		requestPlayAgain(() => {});
	}

	return (
		<Modal
			className={`text-primary max-md:w-7/8 w-1/2 ${className}`}
			show={gameState === "finished"}
		>
			<h1 className="mb-3 text-5xl font-semibold max-md:text-3xl">
				Game Over
			</h1>
			<h2 className="text-active-text text-2xl font-medium max-md:text-lg">
				{winner ? `${winner.displayName} wins!` : "It's a draw!"}
			</h2>

			<Button
				color="primary"
				onClick={handlePlayAgain}
				disabled={playAgainDisabled}
				className="mt-4 min-h-20 w-full max-md:mx-0 max-md:my-3 md:mx-3"
			>
				<div className="flex flex-col justify-center">
					<h1>Play Again</h1>
					{playAgainContents}
				</div>
			</Button>

			<Button
				text={"Leave Game"}
				color={"secondary"}
				onClick={handleLeaveGame}
				className="mt-4 min-h-20 w-full max-md:mx-0 max-md:my-3 md:mx-3"
			/>
		</Modal>
	);
}

export default GameEndModal;
