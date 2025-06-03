import { useRef } from "react";

function Popup({ children, isOpen, onClose }) {
	const popupRef = useRef(null);

	if (!isOpen) return null;

	function handleCloseClick() {
		if (popupRef.current) {
			popupRef.current.classList.remove("animate-fly-in-bottom");
			popupRef.current.classList.add("animate-fly-out-bottom");
		}

		onClose();
	}

	return (
		<div
			className={`z-100 fixed bottom-0 w-full translate-y-8 select-none ${isOpen ? "animate-fly-in-bottom" : "hidden"}`}
			ref={popupRef}
		>
			<div className="jusify-center flex w-full flex-col items-center">
				<div className="bg-modal-gray hover:bg-active-text inset-shadow-sm inset-shadow-dark border-primary z-10 h-1/6 w-1/4 translate-y-1 rounded-t-2xl border-4 border-b-transparent py-1 active:bg-gray-400">
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
					className={`bg-modal-gray inset-shadow-sm inset-shadow-dark drop-shadow-dark border-primary rounded-4xl z-20 flex w-full justify-center border-8 border-b-transparent p-4 pb-8 drop-shadow-2xl`}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Popup;
