function VerticalDivider({ index, className = "" }) {
	return (
		<div
			className={`absolute bottom-0 z-10 ${index === 0 ? "left-1/3" : "left-2/3"} top-0 -translate-x-1/2 ${className}`}
		/>
	);
}

function HorizontalDivider({ index, className = "" }) {
	return (
		<div
			className={`absolute left-0 right-0 ${index === 0 ? "top-1/3" : "top-2/3"} -translate-y-1/2 ${className}`}
		/>
	);
}

export { VerticalDivider, HorizontalDivider };
