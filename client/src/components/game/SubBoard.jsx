import { useMediaQuery } from "react-responsive";

import { Cell, VerticalDivider, HorizontalDivider } from "./";
import { useContext } from "react";
import { SocketContext, DiscordSDKContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";
import { useEffect } from "react";

function SubBoard({
	onSelect,
	onSelectMobile = null,
	cellStates,
	boardIndex,
	verticalDividerStyles = "w-1 max-md:w-0.5 rounded-2xl bg-gray-600",
	horizontalDividerStyles = "h-1 max-md:h-0.5 rounded-2xl bg-gray-600",
	popup = false,
}) {
	const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
	const { auth } = useContext(DiscordSDKContext);
	const {
		boardState: { currentBoardIndex, superBoardState },
		currentTurn,
	} = useContext(SocketContext);

	const userID = getUserId(auth);
	const boardOwner = superBoardState?.board[boardIndex] || "UNCLAIMED";

	const isCurrentTurn = currentTurn === userID;
	const isCurrentBoard =
		currentBoardIndex === -1 || currentBoardIndex === boardIndex;
	const isClaimedBoard = boardOwner !== "UNCLAIMED";

	function resolveClaimedIcon() {
		if (superBoardState?.board[boardIndex] === "X") {
			return "/.proxy/icons/cross-secondary-outlined.svg";
		} else if (superBoardState?.board[boardIndex] === "O") {
			return "/.proxy/icons/circle-primary-outlined.svg";
		}
		return "";
	}

	function handleCellClick(currentState, position) {
		if (isMobile && !popup) {
			onSelectMobile(boardIndex);
			return;
		}
		onSelect(boardIndex, position, currentState);
	}

	return (
		<div
			className={`relative p-4 max-md:p-2 ${popup ? "size-full" : "aspect-square h-full"}`}
		>
			<img
				src={resolveClaimedIcon()}
				alt="Claimed Board Icon"
				className={`stroke-light stroke-50 absolute inset-5 z-20 blur-none ${isClaimedBoard ? "" : "hidden"}`}
				draggable={false}
			/>
			<div
				className={`z-0 aspect-square size-full rounded-2xl p-2 max-md:rounded-lg max-md:p-0.5 ${isClaimedBoard ? "blur-[2px]" : ""} ${!popup && isCurrentBoard && isCurrentTurn ? "hover:bg-modal-gray hover:outline-primary hover:outline-4" : ""} ${!isCurrentTurn ? "bg-gray-400/75" : `${isCurrentBoard ? "bg-modal-gray/75" : "bg-secondary-light/75"}`}`}
			>
				<div className="relative">
					<VerticalDivider
						index={0}
						className={verticalDividerStyles}
					/>
					<VerticalDivider
						index={1}
						className={verticalDividerStyles}
					/>
					<HorizontalDivider
						index={0}
						className={horizontalDividerStyles}
					/>
					<HorizontalDivider
						index={1}
						className={horizontalDividerStyles}
					/>
					<div className="grid grid-cols-3 grid-rows-3">
						{cellStates.map((currentState, i) => (
							<Cell
								key={i}
								value={currentState}
								onClick={() => handleCellClick(currentState, i)}
								popup={popup}
								isDisabled={
									!isCurrentBoard ||
									!isCurrentTurn ||
									isClaimedBoard
								}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubBoard;
