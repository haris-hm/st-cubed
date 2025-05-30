import { useContext } from "react";
import { Avatar } from "../ui";
import { SocketContext } from "../../context/Context";
import { useMediaQuery } from "react-responsive";

function PlayerCard({
	side,
	discordID,
	avatarHash,
	displayName,
	playPiece,
	className = "",
}) {
	const { currentTurn } = useContext(SocketContext);
	const isSmallerScreen = useMediaQuery({ query: "(max-width: 768px)" });

	const avatarElement = (
		<Avatar
			userId={discordID}
			avatarHash={avatarHash}
			className={`${currentTurn === discordID ? "outline-6 outline-tertiary shadow-light shadow-2xl" : ""} border-light border-4 max-md:size-20`}
		/>
	);

	const userInfoElement = (
		<div
			className={`text-primary font-noto-sans flex flex-row items-center justify-between text-2xl font-bold max-md:text-lg`}
		>
			<img
				src={`/.proxy/icons/${playPiece === "X" ? "cross-secondary" : "circle-primary"}.svg`}
				alt={playPiece}
				className="size-10"
			/>
			<p className="bg-modal-gray rounded-full px-4 py-2">
				{displayName}
			</p>
		</div>
	);

	return (
		<div
			className={`flex items-center ${side === "left" ? "justify-start" : "justify-end"} ${isSmallerScreen ? "flex-col" : "flex-row"} ${className}`}
		>
			{side === "right" && !isSmallerScreen ? (
				<>
					{userInfoElement}
					{avatarElement}
				</>
			) : (
				<>
					{avatarElement}
					{userInfoElement}
				</>
			)}
		</div>
	);
}

export default PlayerCard;
