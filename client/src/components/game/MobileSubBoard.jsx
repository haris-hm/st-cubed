import { SubBoard } from "./";

function MobileSubBoard({ show, onSelect, onClose, cellStates, boardIndex }) {
	if (!show) {
		return null;
	}

	function handleCloseClick() {
		onClose();
	}

	function handleCellClick(currentState, position) {
		onSelect(boardIndex, position, currentState);
	}

	return (
		<div
			className={`fixed bottom-0 z-20 w-full ${show ? "animate-fly-in-bottom" : "animate-fly-out-bottom"}`}
		>
			<div className="jusify-center flex w-full flex-col items-center">
				<div className="bg-modal-gray border-primary h-1/6 w-1/4 rounded-t-2xl border-4 border-b-transparent">
					<button
						className="flex size-full items-center justify-center"
						onClick={handleCloseClick}
					>
						<img
							src="/.proxy/icons/chevron-down.svg"
							alt="Close"
							className="size-10"
						/>
					</button>
				</div>
				<div
					className={`bg-modal-gray border-primary rounded-4xl flex w-full justify-center border-8 border-b-transparent`}
				>
					<SubBoard
						onSelect={handleCellClick}
						cellStates={cellStates}
						boardIndex={boardIndex}
						verticalDividerStyles={"w-2 rounded-2xl bg-gray-600"}
						horizontalDividerStyles={"h-2 rounded-2xl bg-gray-600"}
					/>
				</div>
			</div>
		</div>
	);
}

export default MobileSubBoard;
