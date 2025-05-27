function BoardDividers({ color, width, direction }) {
	let firstClasses = "";
	let secondClasses = "";

	if (direction === "vertical") {
		firstClasses = `bg-${color} absolute bottom-0 left-1/3 top-0 z-10 w-${width} -translate-x-1/2 rounded-2xl`;
		secondClasses = `bg-${color} absolute bottom-0 left-2/3 top-0 z-10 w-${width} -translate-x-1/2 rounded-2xl`;
	} else {
		firstClasses = `bg-${color} absolute left-0 right-0 top-1/3 z-10 h-${width} -translate-y-1/2 rounded-2xl`;
		secondClasses = `bg-${color} absolute left-0 right-0 top-2/3 z-10 h-${width} -translate-y-1/2 rounded-2xl`;
	}

	return (
		<>
			<div className={firstClasses} />
			<div className={secondClasses} />
		</>
	);
}

export default BoardDividers;
