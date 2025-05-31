import { useState, useEffect, useContext } from "react";

import {
	SubBoard,
	VerticalDivider,
	HorizontalDivider,
	MobileSubBoard,
	GameInfoBar,
	GameInfoColumn,
} from "./";
import { useMediaQuery } from "react-responsive";
import { makeMove } from "../../util/socket/emit";
import { DiscordSDKContext, SocketContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";

function Board() {
	const [cellValues, setCellValues] = useState(
		Array(9).fill(Array(9).fill(null)),
	);
	const [showMobileBoard, setShowMobileBoard] = useState(false);
	const [mobileBoardArgs, setMobileBoardArgs] = useState({
		boardIndex: null,
		cellStates: null,
	});

	const { auth } = useContext(DiscordSDKContext);
	const { currentTurn } = useContext(SocketContext);

	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	const verticalDividerStyles = "w-2 max-md:w-1 rounded-2xl bg-gray-800";
	const horizontalDividerStyles = "h-2 max-md:h-1 rounded-2xl bg-gray-800";

	useEffect(() => {}, []);

	function handleOpenMobileSubBoard(boardIndex) {
		setMobileBoardArgs({
			boardIndex,
			cellStates: cellValues[boardIndex],
		});
		setShowMobileBoard(true);
	}

	function handleCloseMobileSubBoard() {
		setShowMobileBoard(false);
		setMobileBoardArgs({
			boardIndex: null,
			cellStates: null,
		});
	}

	function handleSubBoardEvent(boardIndex, position, currentState) {
		// Don't do anything if the mobile board is open and the boardIndex doesn't match
		if (showMobileBoard && boardIndex !== mobileBoardArgs?.boardIndex) {
			return;
		}

		const userID = getUserId(auth);

		if (currentState === null && currentTurn === userID) {
			console.log(
				`Making move at board ${boardIndex}, position ${position} for user ${userID}`,
			);
			makeMove({ userID, boardIndex, position }, () => {});
		}
	}

	return (
		<>
			<div className="flex size-full select-none flex-col p-5 max-sm:p-3">
				{!isMobile ? <GameInfoBar className="pb-4" /> : null}
				<div className="max-md:mt-15 flex items-center justify-center">
					<div className="relative mx-auto aspect-square max-h-[calc(100vh-120px-2.5rem)] w-full max-w-[min(100vw,100vh-120px)]">
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
						<div className="grid h-full w-full grid-cols-3 grid-rows-3">
							{Array.from({ length: 9 }).map((_, i) => (
								<SubBoard
									key={i}
									boardIndex={i}
									cellStates={cellValues[i]}
									onSelect={handleSubBoardEvent}
									onSelectMobile={handleOpenMobileSubBoard}
								/>
							))}
						</div>
					</div>
				</div>
				{isMobile ? (
					<div className="mt-4 min-h-0 flex-1 overflow-y-auto px-6">
						<GameInfoColumn />
					</div>
				) : null}
			</div>
			<div className="w-full select-none">
				<MobileSubBoard
					show={showMobileBoard}
					boardIndex={mobileBoardArgs?.boardIndex}
					cellStates={mobileBoardArgs?.cellStates}
					onSelect={handleSubBoardEvent}
					onClose={handleCloseMobileSubBoard}
				/>
			</div>
		</>
	);
}

export default Board;
