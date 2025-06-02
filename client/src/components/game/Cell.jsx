import { useMediaQuery } from "react-responsive";

function Cell({
	value,
	onClick,
	isDisabled = false,
	className = "",
	popup = false,
}) {
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
			className={`aspect-square size-full ${popup ? "p-3" : "p-1"} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
			onClick={onClick}
			// Allow user to open the popup by clicking on the cell
			// but disable the button in the popup if the cell already has a value
			disabled={(isMobile && popup && value) || isDisabled}
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
					className={`block h-full w-full ${!isDisabled ? "hover:bg-active-text active:outline-primary active:bg-gray-400" : ""} ${popup ? "rounded-2xl" : "rounded-lg"} ${popup && !isDisabled ? "active:outline-8 active:-outline-offset-8" : ""} ${!popup && !isDisabled ? "active:outline-4 active:-outline-offset-4" : ""}`}
				/>
			)}
		</button>
	);
}

export default Cell;
