import { useState, useEffect } from "react";

import { SubBoard, BoardDividers } from "./";

function Board() {
	const [cellValues, setCellValues] = useState(
		Array(9).fill(Array(9).fill(null)),
	);

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

	function handleSubBoardEvent(boardIndex, position, currentState) {
		console.log(
			`Board: ${boardIndex}, Position: ${position}, Current State: ${currentState}`,
		);
	}
	return (
		<div className="relative mx-auto aspect-square max-h-full">
			<BoardDividers direction={"vertical"} color={"dark"} width={3} />
			<BoardDividers direction={"horizontal"} color={"dark"} width={3} />
			<div className="h-1/1 grid w-full grid-cols-3 grid-rows-3">
				{Array.from({ length: 9 }).map((_, i) => (
					<SubBoard
						key={i}
						boardIndex={i}
						cellStates={cellValues[i]}
						onSelect={handleSubBoardEvent}
					/>
				))}
			</div>
		</div>
	);
}

export default Board;
