import { useContext } from "react";
import { Avatar } from "../ui";
import { SocketContext } from "../../context/Context";

function PlayerCard({ side, discordID, avatarHash, playPiece }) {
	const { currentTurn } = useContext(SocketContext);
	return (
		<div
			className={`flex flex-row ${side === "left" ? "justify-start" : "justify-end"}`}
		>
			<Avatar
				userId={discordID}
				avatarHash={avatarHash}
				className={`${currentTurn === discordID ? "border-tertiary" : "border-light"} border-4`}
			/>
			<div></div>
		</div>
	);
}

export default PlayerCard;
