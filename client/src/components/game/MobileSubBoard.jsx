import { SubBoard } from "./";
import { Popup } from "../ui";

function MobileSubBoard({ show, onSelect, onClose, cellStates, boardIndex }) {
	if (!show || !cellStates || !onSelect || !onClose) {
		return null;
	}

	function handleCloseClick() {
		setTimeout(() => {
			onClose();
		}, 250); // Allow time for animation to finish
	}

	function handleCellClick(boardIndex, position, currentState) {
		onSelect(boardIndex, position, currentState);
		handleCloseClick();
	}

	return (
		<Popup isOpen={show} onClose={handleCloseClick}>
			<SubBoard
				onSelect={handleCellClick}
				cellStates={cellStates}
				boardIndex={boardIndex}
				verticalDividerStyles={"w-2 rounded-2xl bg-gray-600"}
				horizontalDividerStyles={"h-2 rounded-2xl bg-gray-600"}
				popup={true}
			/>
		</Popup>
	);
}

export default MobileSubBoard;
