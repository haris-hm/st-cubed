import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../../context/Context";

function WinnerIndicatorLine({ boardIndex, triggerAnimation }) {
	const {
		boardState: { subGameStates },
	} = useContext(SocketContext);

	const animationPlayed = useRef(false);
	const lineRef = useRef(null);
	const styles = useRef("");

	useEffect(() => {
		const horizontalStyles =
			"h-2 left-0 right-0 -translate-y-1/2 animate-winner-line-grow-x";
		const verticalStyles =
			"w-2 top-0 bottom-0 -translate-x-1/2 animate-winner-line-grow-y";

		const combinationTypes = [
			{
				type: "horizontal",
				combination: [0, 1, 2],
				styles: `${horizontalStyles} top-1/6`,
			},
			{
				type: "horizontal",
				combination: [3, 4, 5],
				styles: `${horizontalStyles} top-1/2`,
			},
			{
				type: "horizontal",
				combination: [6, 7, 8],
				styles: `${horizontalStyles} top-5/6`,
			},
			{
				type: "vertical",
				combination: [0, 3, 6],
				styles: `${verticalStyles} left-1/6`,
			},
			{
				type: "vertical",
				combination: [1, 4, 7],
				styles: `${verticalStyles} left-1/2`,
			},
			{
				type: "vertical",
				combination: [2, 5, 8],
				styles: `${verticalStyles} left-5/6`,
			},
			{
				type: "diagonal",
				combination: [0, 4, 8],
				styles: `${horizontalStyles} top-1/2 rotate-45`,
			},
			{
				type: "diagonal",
				combination: [2, 4, 6],
				styles: `${horizontalStyles} top-1/2 -rotate-45`,
			},
		];

		if (
			subGameStates &&
			subGameStates[boardIndex]?.winState?.winningCombination
		) {
			const winningCombination =
				subGameStates[boardIndex].winState?.winningCombination;

			const winningType = combinationTypes.find((combination) =>
				combination.combination.every((index) =>
					winningCombination.includes(index),
				),
			);

			styles.current = winningType.styles;

			if (animationPlayed.current === false && lineRef.current) {
				animationPlayed.current = true;
				const animationTimeout = setTimeout(() => {
					triggerAnimation();
					lineRef.current.classList.remove(
						"animate-winner-line-grow-x",
						"animate-winner-line-grow-y",
					);
					clearTimeout(animationTimeout);
				}, 400);
			}
		}
	}, [boardIndex, subGameStates, triggerAnimation, animationPlayed]);

	return (
		<div
			className={`bg-tertiary absolute z-30 rounded-2xl ${styles?.current}`}
			ref={lineRef}
		/>
	);
}

export default WinnerIndicatorLine;
