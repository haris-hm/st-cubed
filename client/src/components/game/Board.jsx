import { useState, useEffect, useRef } from "react";

import {
	SubBoard,
	VerticalDivider,
	HorizontalDivider,
	MobileSubBoard,
} from "./";

function Board() {
	const [cellValues, setCellValues] = useState(
		Array(9).fill(Array(9).fill(null)),
	);
	const [showMobileBoard, setShowMobileBoard] = useState(false);

	const [mobileBoardArgs, setMobileBoardArgs] = useState({
		boardIndex: null,
		cellStates: null,
	});

	const verticalDividerStyles = "w-2 max-md:w-1 rounded-2xl bg-gray-800";
	const horizontalDividerStyles = "h-2 max-md:h-1 rounded-2xl bg-gray-800";

	useEffect(() => {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				setCellValues((prev) => {
					const newValues = prev.map((row) => [...row]);
					newValues[i][j] = Math.random() < 0.5 ? "X" : "O";
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
		if (showMobileBoard) {
			return;
		}
		console.log(
			`Board: ${boardIndex}, Position: ${position}, Current State: ${currentState}`,
		);
	}

	return (
		<>
			<div className="max-sm:pt-15 size-full p-5 max-sm:p-3">
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
			</div>
			<div className="w-full">
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
