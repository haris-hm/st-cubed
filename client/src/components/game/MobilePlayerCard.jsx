import { useContext } from "react";
import { Avatar } from "../ui";
import { SocketContext } from "../../context/Context";

function MobilePlayerCard({
	discordID,
	avatarHash,
	displayName,
	playPiece,
	className = "",
}) {
	const { currentTurn } = useContext(SocketContext);

	return (
		<div
			className={`flex flex-row items-center justify-start ${className}`}
		>
			<Avatar
				userId={discordID}
				avatarHash={avatarHash}
				className={`${currentTurn === discordID ? "outline-6 outline-tertiary shadow-light shadow-2xl" : ""} border-light size-30 border-4 pr-8`}
			/>
			<div className="text-primary bg-modal-gray border-primary font-noto-sans flex w-full flex-row items-center justify-between rounded-2xl border-4 text-2xl font-bold">
				<p className="px-4 py-2">{displayName}</p>
				<div className="inline-flex w-fit px-8 py-4">
					<img
						src={`/.proxy/icons/${playPiece === "X" ? "cross-secondary" : "circle-primary"}.svg`}
						alt={playPiece}
						className="size-10"
					/>
				</div>
			</div>
		</div>
	);
}

export default MobilePlayerCard;
