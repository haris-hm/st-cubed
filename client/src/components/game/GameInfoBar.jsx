import { useContext } from "react";

import { PlayerCard, TimeIndicator } from "./";
import { SocketContext } from "../../context/Context";

function GameInfoBar({ className = "" }) {
	const { players } = useContext(SocketContext);

	const firstPlayer = players[0];
	const secondPlayer = players[1];

	return (
		<div
			className={`flex w-full flex-row items-center justify-between ${className}`}
		>
			<PlayerCard
				discordID={firstPlayer.id}
				avatarHash={firstPlayer.avatarHash}
				displayName={firstPlayer.displayName}
				playPiece={firstPlayer.piece}
				side="left"
			/>
			<TimeIndicator />
			<PlayerCard
				discordID={secondPlayer.id}
				avatarHash={secondPlayer.avatarHash}
				displayName={secondPlayer.displayName}
				playPiece={secondPlayer.piece}
				side="right"
			/>
		</div>
	);
}

export default GameInfoBar;
