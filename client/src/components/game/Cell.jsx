import { useContext, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { DiscordSDKContext, SocketContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";
import { useEffect } from "react";

function Cell({
	value,
	onClick,
	isDisabled = false,
	className = "",
	popup = false,
}) {
	const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
	const { auth } = useContext(DiscordSDKContext);
	const { players } = useContext(SocketContext);
	const previewRef = useRef(null);
	const pieceRef = useRef(null);
	const animated = useRef(false);

	const userID = getUserId(auth);
	const playPiece = players.find((player) => player.id === userID)?.piece;

	let src = "";
	let alt = "";

	if (value === "X") {
		src = "/.proxy/icons/cross-secondary.svg";
		alt = "X";
	} else if (value === "O") {
		src = "/.proxy/icons/circle-primary.svg";
		alt = "O";
	}

	useEffect(() => {
		if ((value === "X" || value === "O") && !animated.current) {
			animated.current = true;
			if (pieceRef.current) {
				pieceRef.current.classList.add("animate-cell-pulse");
				setTimeout(() => {
					pieceRef.current.classList.remove("animate-cell-pulse");
				}, 250);
			}
		}
	}, [value]);

	function handleMouseEnter() {
		if (previewRef.current && !isDisabled) {
			previewRef.current.classList.remove("hidden");
		}
	}

	function handleMouseLeave() {
		if (
			previewRef.current &&
			!previewRef.current.classList.contains("hidden")
		) {
			previewRef.current.classList.add("hidden");
		}
	}

	return (
		<button
			className={`aspect-square size-full ${popup ? "p-3" : "p-1"} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
			onClick={onClick}
			// Allow user to open the popup by clicking on the cell
			// but disable the button in the popup if the cell already has a value
			disabled={(isMobile && popup && value) || isDisabled}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{src ? (
				<img
					className="size-full"
					src={src}
					alt={alt}
					draggable={false}
					ref={pieceRef}
				/>
			) : (
				<div
					className={`relative z-10 block h-full w-full ${!isDisabled ? "hover:bg-active-text active:outline-primary active:bg-gray-400" : ""} ${popup ? "rounded-2xl" : "rounded-lg"} ${popup && !isDisabled ? "active:outline-8 active:-outline-offset-8" : ""} ${!popup && !isDisabled ? "active:outline-4 active:-outline-offset-4" : ""}`}
				>
					<img
						className={`pointer-events-none absolute inset-1 z-0 hidden opacity-40`}
						src={`${playPiece === "X" ? "/.proxy/icons/cross-secondary.svg" : "/.proxy/icons/circle-primary.svg"}`}
						alt={playPiece}
						draggable={false}
						ref={previewRef}
					/>
				</div>
			)}
		</button>
	);
}

export default Cell;
