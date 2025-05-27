import React from "react";
import { Cell } from "./";

/**
 *
 * @param {Object} props - The props for the SubBoardRow component.
 * @param {React.RefObject} props.cellRefs - A ref object containing references to the cell elements.
 * @param {Array} props.cellStates - An array containing the states of the cells.
 * @param {Function} props.onClick - A function to handle cell click events. Must accept the cell value and position as arguments.
 * @param {number} props.startingCellIndex - The index of the first cell in the row.
 * @returns
 */
function SubBoardRow({ cellRefs, cellStates, onClick, startingCellIndex }) {
	return (
		<div className="contents">
			<div ref={cellRefs?.current[startingCellIndex]}>
				<Cell
					value={cellStates[startingCellIndex]}
					onClick={() => {
						onClick(
							cellStates[startingCellIndex],
							startingCellIndex,
						);
					}}
				/>
			</div>
			<div ref={cellRefs?.current[startingCellIndex + 1]}>
				<Cell
					value={cellStates[startingCellIndex + 1]}
					onClick={() => {
						onClick(
							cellStates[startingCellIndex + 1],
							startingCellIndex + 1,
						);
					}}
				/>
			</div>
			<div ref={cellRefs?.current[startingCellIndex + 2]}>
				<Cell
					value={cellStates[startingCellIndex + 2]}
					onClick={() => {
						onClick(
							cellStates[startingCellIndex + 2],
							startingCellIndex + 2,
						);
					}}
				/>
			</div>
		</div>
	);
}

export default SubBoardRow;
