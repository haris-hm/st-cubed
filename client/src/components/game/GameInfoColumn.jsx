import { useContext } from "react";

import { PlayerCard, TimeIndicator } from "./";
import { SocketContext } from "../../context/Context";
import { ShareLinkButton } from "../ui";

function GameInfoColumn({ className = "" }) {
	const { players } = useContext(SocketContext);

	const firstPlayer = players[0];
	const secondPlayer = players[1];

	return (
		<div className={`flex flex-col justify-center ${className}`}>
			<div className="mb-4 flex w-full flex-row items-center justify-between">
				<TimeIndicator className="mb-4" />
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
