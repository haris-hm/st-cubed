import { useContext } from "react";

import { PlayerCard, TimeIndicator } from "./";
import { SocketContext } from "../../context/Context";
import { resolvePlayerInfo } from "../../util/game/roomInfo";

function GameInfoBar({ className = "" }) {
	const { players } = useContext(SocketContext);
	const { firstPlayer, secondPlayer } = resolvePlayerInfo(players);

	return (
		<div
			className={`flex w-full flex-row items-center justify-between ${className}`}
		>
			<PlayerCard
				skeleton={firstPlayer.id === null}
				discordID={firstPlayer.id}
				avatarHash={firstPlayer.avatarHash}
				displayName={firstPlayer.displayName}
				playPiece={firstPlayer.piece}
				side="left"
			/>
			<TimeIndicator className="mx-4" />
			<PlayerCard
				skeleton={secondPlayer.id === null}
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
