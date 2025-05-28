function Cell({ value, onClick, className = "" }) {
	let src = "No image";
	let alt = "No image";

	if (value === "X") {
		src = "/.proxy/icons/cross-secondary.svg";
		alt = "X";
	} else if (value === "O") {
		src = "/.proxy/icons/circle-primary.svg";
		alt = "O";
	}

	return (
		<button
			className={`size-full p-1 max-md:p-0.5 ${className}`}
			onClick={onClick}
		>
			<img
				className={`size-full ${src == "" ? "hidden" : ""}`}
				src={src}
				alt={alt}
				draggable={false}
			/>
		</button>
	);
}

export default Cell;
