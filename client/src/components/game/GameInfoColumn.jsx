import { useContext } from "react";

import { PlayerCard, TimeIndicator, LeaveGameButton } from "./";
import { SocketContext } from "../../context/Context";
import { ShareLinkButton } from "../ui";
import { capitalizeFirstLetters } from "../../util/game/roomCode";

function GameInfoColumn({ className = "" }) {
	const { players, roomID } = useContext(SocketContext);

	const firstPlayer = players[0];
	const secondPlayer = players[1];

	return (
		<div className={`flex flex-col justify-center ${className}`}>
			<div className="mb-4 flex w-full flex-row items-center justify-between">
				<TimeIndicator className="mr-4" />
				<ShareLinkButton
					message={`Come watch me play Super Tic-Tac-Toe!\n\nJoin Code: ${capitalizeFirstLetters(roomID)}`}
				/>
				<LeaveGameButton className="ml-4" />
			</div>
			<PlayerCard
				discordID={firstPlayer.id}
				avatarHash={firstPlayer.avatarHash}
				displayName={firstPlayer.displayName}
				playPiece={firstPlayer.piece}
				fullHeightName={true}
				className="mb-4"
			/>
			<PlayerCard
				discordID={secondPlayer.id}
				avatarHash={secondPlayer.avatarHash}
				displayName={secondPlayer.displayName}
				playPiece={secondPlayer.piece}
				fullHeightName={true}
			/>
		</div>
	);
}

export default GameInfoColumn;
