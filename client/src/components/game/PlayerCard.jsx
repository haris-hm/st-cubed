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
		<div
			className={`flex flex-row ${fullHeightName ? "w-1/4 justify-center" : `max-2md:w-1/3 w-1/4 ${side === "left" ? "justify-end" : "justify-start"}`}`}
		>
			<Avatar
				userId={discordID}
				avatarHash={avatarHash}
				className={`border-light size-full border-4 ${currentTurn === discordID ? "outline-6 outline-tertiary shadow-light shadow-2xl" : ""} ${fullHeightName ? "max-w-20" : "max-w-25"}`}
			/>
		</div>
	);

	const displayNameText = (
		<p
			className={`px-4 py-2 ${fullHeightName ? "" : "max-2md:w-[5em] 2md:max-w-3/4 truncate text-ellipsis break-all"}`}
		>
			{displayName}
		</p>
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
			className={`w-3/4 ${fullHeightName ? "h-20" : `max-2md:w-2/3 flex h-full ${side === "left" ? "pl-4" : "pr-4"}`}`}
		>
			<div
				className={`text-primary bg-modal-gray inset-shadow-dark inset-shadow-sm border-primary font-noto-sans flex size-full flex-row items-center justify-between rounded-2xl border-4 text-2xl font-bold md:rounded-full`}
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
		</div>
	);

	return (
		<div
			className={`flex w-full flex-row items-center justify-between ${className}`}
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
