import { useMediaQuery } from "react-responsive";

function Cell({ value, onClick, className = "", popup = false }) {
	const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
	let src = "";
	let alt = "";

	if (value === "X") {
		src = "/.proxy/icons/cross-secondary.svg";
		alt = "X";
	} else if (value === "O") {
		src = "/.proxy/icons/circle-primary.svg";
		alt = "O";
	}

	return (
		<button
			className={`aspect-square size-full ${popup ? "p-3" : "p-1"} ${className}`}
			onClick={onClick}
			// Allow user to open the popup by clicking on the cell
			// but disable the button in the popup if the cell already has a value
			disabled={isMobile && popup && value}
		>
			{src ? (
				<img
					className="size-full"
					src={src}
					alt={alt}
					draggable={false}
				/>
			) : (
				<span
					className={`hover:bg-active-text active:outline-primary block h-full w-full active:bg-gray-400 ${popup ? "rounded-2xl active:outline-8 active:-outline-offset-8" : "rounded-lg active:outline-4 active:-outline-offset-4"}`}
				/>
			)}
		</button>
	);
}

export default Cell;
