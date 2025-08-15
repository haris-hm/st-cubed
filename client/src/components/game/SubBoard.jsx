import { useMediaQuery } from "react-responsive";

import {
	Cell,
	VerticalDivider,
	HorizontalDivider,
	WinnerIndicatorLine,
} from "./";
import { useContext } from "react";
import { SocketContext, DiscordSDKContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";
import { useRef } from "react";
import { useState } from "react";

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
		boardState: { currentBoardIndex, superBoardState, subGameStates },
		currentTurn,
	} = useContext(SocketContext);

	const cellClaimIcon = useRef(null);
	const [animationPlayed, setAnimationPlayed] = useState(false);

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

	function animateCellPulse() {
		if (cellClaimIcon.current && !animationPlayed) {
			setAnimationPlayed(true);
			cellClaimIcon.current.classList.remove("hidden");
			cellClaimIcon.current.classList.add("animate-cell-pulse");
			const animateTimeout = setTimeout(() => {
				cellClaimIcon.current.classList.remove("animate-pulse");
				clearTimeout(animateTimeout);
			}, 250);
		}
	}

	return (
		<div
			className={`relative p-4 max-md:p-2 ${popup ? "size-full" : "aspect-square h-full"}`}
		>
			<img
				src={resolveClaimedIcon()}
				alt="Claimed Board Icon"
				className={
					"absolute left-1/2 top-1/2 z-40 hidden h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 blur-none max-md:h-5/6 max-md:w-5/6"
				}
				draggable={false}
				ref={cellClaimIcon}
			/>
			<div
				className={`z-0 aspect-square size-full rounded-2xl p-2 max-md:rounded-lg max-md:p-0.5 ${animationPlayed ? "blur-[2px]" : "blur-none"} ${!popup && isCurrentBoard && isCurrentTurn ? "hover:bg-modal-gray hover:outline-primary hover:outline-4" : ""} ${!isCurrentTurn ? "bg-gray-400/75" : `${isCurrentBoard ? "bg-modal-gray/75" : "bg-tertiary-light/75"}`}`}
			>
				<div className="relative">
					<WinnerIndicatorLine
						gameState={
							subGameStates ? subGameStates[boardIndex] : null
						}
						triggerAnimation={animateCellPulse}
					/>
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
