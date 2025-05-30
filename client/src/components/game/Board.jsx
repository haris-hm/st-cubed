import { useState, useEffect, useContext } from "react";

import {
	SubBoard,
	VerticalDivider,
	HorizontalDivider,
	MobileSubBoard,
	PlayerCard,
	MobilePlayerCard,
} from "./";
import { SocketContext } from "../../context/Context";
import { useMediaQuery } from "react-responsive";

function Board() {
	const [cellValues, setCellValues] = useState(
		Array(9).fill(Array(9).fill(null)),
	);
	const [showMobileBoard, setShowMobileBoard] = useState(false);
	const [mobileBoardArgs, setMobileBoardArgs] = useState({
		boardIndex: null,
		cellStates: null,
	});

	const { players, currentTurn, currentTime } = useContext(SocketContext);

	const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

	const verticalDividerStyles = "w-2 max-md:w-1 rounded-2xl bg-gray-800";
	const horizontalDividerStyles = "h-2 max-md:h-1 rounded-2xl bg-gray-800";

	useEffect(() => {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				setCellValues((prev) => {
					const newValues = prev.map((row) => [...row]);
					const randValue = Math.random();
					if (randValue < 0.33) {
						newValues[i][j] = "X";
					} else if (randValue < 0.66) {
						newValues[i][j] = "O";
					} else {
						newValues[i][j] = null;
					}
					return newValues;
				});
			}
		}
	}, []);

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
		console.log(
			`Board: ${boardIndex}, Position: ${position}, Current State: ${currentState}`,
		);
	}

	return (
		<>
			<div className="max-sm:pt-15 relative size-full select-none p-5 max-sm:p-3">
				<div className="relative mx-auto aspect-square max-h-full">
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
					<div className="h-1/1 grid w-full grid-cols-3 grid-rows-3">
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

				{isMobile ? (
					<div className="flex size-full flex-col">
						<MobilePlayerCard
							discordID={players[0].id}
							avatarHash={players[0].avatarHash}
							displayName={players[0].displayName}
							playPiece={players[0].piece}
							className="mb-5"
						/>
						<MobilePlayerCard
							discordID={players[1].id}
							avatarHash={players[1].avatarHash}
							displayName={players[1].displayName}
							playPiece={players[1].piece}
						/>
					</div>
				) : (
					<>
						<PlayerCard
							className={"absolute left-0 top-0 p-5"}
							side={"left"}
							discordID={players[0].id}
							avatarHash={players[0].avatarHash}
							displayName={players[0].displayName}
							playPiece={players[0].piece}
						/>
						<PlayerCard
							className={"absolute right-0 top-0 p-5"}
							side={"right"}
							discordID={players[1].id}
							avatarHash={players[1].avatarHash}
							displayName={players[1].displayName}
							playPiece={players[1].piece}
						/>
					</>
				)}
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
