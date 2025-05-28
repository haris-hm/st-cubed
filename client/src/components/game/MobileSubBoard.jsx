import { useRef } from "react";

import { SubBoard } from "./";

function MobileSubBoard({ show, onSelect, onClose, cellStates, boardIndex }) {
	const popupRef = useRef(null);

	if (!show || !cellStates || !onSelect || !onClose) {
		return null;
	}

	function handleCloseClick() {
		if (popupRef.current) {
			popupRef.current.classList.remove("animate-fly-in-bottom");
			popupRef.current.classList.add("animate-fly-out-bottom");
		}

		setTimeout(() => {
			onClose();
		}, 250); // Allow time for animation to finish
	}

	function handleCellClick(boardIndex, position, currentState) {
		onSelect(boardIndex, position, currentState);
	}

	return (
		<div
			className={`fixed bottom-0 z-20 w-full translate-y-8 ${show ? "animate-fly-in-bottom" : "hidden"}`}
			ref={popupRef}
		>
			<div className="jusify-center flex w-full flex-col items-center">
				<div className="bg-modal-gray inset-shadow-sm inset-shadow-dark border-primary z-21 h-1/6 w-1/4 translate-y-1 rounded-t-2xl border-4 border-b-transparent py-1">
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
					className={`bg-modal-gray inset-shadow-sm inset-shadow-dark drop-shadow-dark border-primary rounded-4xl z-22 flex w-full justify-center border-8 border-b-transparent p-4 pb-8 drop-shadow-2xl`}
				>
					<SubBoard
						onSelect={handleCellClick}
						cellStates={cellStates}
						boardIndex={boardIndex}
						verticalDividerStyles={"w-2 rounded-2xl bg-gray-600"}
						horizontalDividerStyles={"h-2 rounded-2xl bg-gray-600"}
						popup={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default MobileSubBoard;
