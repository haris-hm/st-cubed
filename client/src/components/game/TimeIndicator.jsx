import { useContext } from "react";

import { SocketContext } from "../../context/Context";

function TimeIndicator({ className = "" }) {
	const { currentTime } = useContext(SocketContext);

	let minutes = null;
	let seconds = null;

	if (currentTime !== -1) {
		const dateSeconds = new Date(currentTime * 1000);
		minutes = dateSeconds.getMinutes().toString().padStart(2, "0");
		seconds = dateSeconds.getSeconds().toString().padStart(2, "0");
	}

	return (
		<div
			className={`font-noto-sans text-primary bg-modal-gray border-primary inset-shadow-dark inset-shadow-sm mx-16 flex flex-col items-center rounded-full border-4 px-4 py-2 text-2xl font-bold ${className}`}
		>
			<h1 className="whitespace-nowrap">
				{minutes && seconds
					? `${minutes}:${seconds}`
					: "Unlimited Time"}
			</h1>
		</div>
	);
}

export default TimeIndicator;
