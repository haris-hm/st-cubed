import { useState, useRef } from "react";

import { Cell, BoardDividers } from "./";

function SubBoard({ onSelect, cellStates, boardIndex }) {
	const cellRefs = useRef(Array(9).fill(null));

	function handleCellClick(currentState, position) {
		onSelect(boardIndex, position, currentState);
	}

	return (
		// <div className="grid grid-cols-3 grid-rows-3 gap-2">
		// 	<BoardDividers
		// 		direction={"vertical"}
		// 		color={"text-active"}
		// 		width={2}
		// 	/>
		// 	<BoardDividers
		// 		direction={"horizontal"}
		// 		color={"text-active"}
		// 		width={2}
		// 	/>
		// 	<SubBoardRow
		// 		startingCellIndex={0}
		// 		cellRefs={cellRefs}
		// 		onClick={handleCellClick}
		// 		cellStates={cellStates}
		// 	/>
		// 	<SubBoardRow
		// 		startingCellIndex={3}
		// 		cellRefs={cellRefs}
		// 		onClick={handleCellClick}
		// 		cellStates={cellStates}
		// 	/>
		// 	<SubBoardRow
		// 		startingCellIndex={6}
		// 		cellRefs={cellRefs}
		// 		onClick={handleCellClick}
		// 		cellStates={cellStates}
		// 	/>
		// </div>

		<div className="relative mx-auto aspect-square max-h-full p-2">
			<BoardDividers direction={"vertical"} color={"dark"} width={2} />
			<BoardDividers direction={"horizontal"} color={"dark"} width={2} />
			<div className="h-1/1 grid w-full grid-cols-3 grid-rows-3">
				{Array.from({ length: 9 }).map((_, i) => (
					<Cell
						key={i}
						value={cellStates[i]}
						onClick={() => {
							handleCellClick(cellStates[i], i);
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default SubBoard;
