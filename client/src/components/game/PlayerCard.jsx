import { useContext } from "react";
import { Avatar } from "../ui";
import { SocketContext } from "../../context/Context";

function PlayerCard({
	discordID,
	avatarHash,
	displayName,
	playPiece,
	side = "left",
	className = "",
	fullHeightName = false,
}) {
	const { currentTurn } = useContext(SocketContext);

	const avatarElement = (
		<Avatar
			userId={discordID}
			avatarHash={avatarHash}
			className={`border-light border-4 ${currentTurn === discordID ? "outline-6 outline-tertiary shadow-light shadow-2xl" : ""} ${side === "left" ? "mr-6" : "ml-6"} ${fullHeightName ? "size-20" : "size-25"}`}
		/>
	);

	const displayNameText = (
		<p className="line-clamp-1 px-4 py-2">{displayName}</p>
	);

	const playPieceIndicator = (
		<img
			src={`/.proxy/icons/${playPiece === "X" ? "cross-secondary" : "circle-primary"}.svg`}
			alt={playPiece}
			className={`size-10 py-2 ${side === "left" ? "pr-4" : "pl-4"}`}
		/>
	);

	const nameElement = (
		<div
			className={`text-primary bg-modal-gray inset-shadow-dark inset-shadow-sm border-primary font-noto-sans flex w-full flex-row items-center justify-between rounded-2xl border-4 text-2xl font-bold md:rounded-full ${fullHeightName ? "h-full" : ""}`}
		>
			{side === "left" ? (
				<>
					{displayNameText}
					{playPieceIndicator}
				</>
			) : (
				<>
					{playPieceIndicator}
					{displayNameText}
				</>
			)}
		</div>
	);

	return (
		<div
			className={`flex w-full flex-row items-center justify-start ${className}`}
		>
			{side === "left" ? (
				<>
					{avatarElement}
					{nameElement}
				</>
			) : (
				<>
					{nameElement}
					{avatarElement}
				</>
			)}
		</div>
	);
}

export default PlayerCard;
