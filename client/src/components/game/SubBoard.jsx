import { useMediaQuery } from "react-responsive";

import { Cell, VerticalDivider, HorizontalDivider } from "./";
import { useContext } from "react";
import { SocketContext, DiscordSDKContext } from "../../context/Context";
import { getUserId } from "../../util/discord/getUserInfo";

function SubBoard({
	onSelect,
	onSelectMobile = null,
	cellStates,
	boardIndex,
	verticalDividerStyles = "w-1 max-md:w-0.5 rounded-2xl bg-gray-600",
	horizontalDividerStyles = "h-1 max-md:h-0.5 rounded-2xl bg-gray-600",
	popup = false,
}) {
	const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
	const { auth } = useContext(DiscordSDKContext);
	const {
		boardState: { currentBoardIndex },
		currentTurn,
	} = useContext(SocketContext);

	const userID = getUserId(auth);

	const isCurrentTurn = currentTurn === userID;
	const isCurrentBoard =
		currentBoardIndex === -1 || currentBoardIndex === boardIndex;

	function handleCellClick(currentState, position) {
		if (isMobile && !popup) {
			onSelectMobile(boardIndex);
			return;
		}
		onSelect(boardIndex, position, currentState);
	}

	return (
		<div
			className={`relative p-4 max-md:p-2 ${popup ? "size-full" : "aspect-square h-full"}`}
		>
			<div
				className={`aspect-square size-full rounded-2xl p-2 max-md:rounded-lg max-md:p-0.5 ${!popup && isCurrentBoard && isCurrentTurn ? "hover:bg-modal-gray hover:outline-primary hover:outline-4" : ""} ${!isCurrentTurn ? "bg-gray-400/75" : `${isCurrentBoard ? "bg-modal-gray/75" : "bg-secondary-light/75"}`}`}
			>
				<div className="relative">
					<VerticalDivider
						index={0}
						className={verticalDividerStyles}
					/>
					<VerticalDivider
						index={1}
						className={verticalDividerStyles}
					/>
					<HorizontalDivider
						index={0}
						className={horizontalDividerStyles}
					/>
					<HorizontalDivider
						index={1}
						className={horizontalDividerStyles}
					/>
					<div className="grid grid-cols-3 grid-rows-3">
						{cellStates.map((currentState, i) => (
							<Cell
								key={i}
								value={currentState}
								onClick={() => handleCellClick(currentState, i)}
								popup={popup}
								isDisabled={!isCurrentBoard || !isCurrentTurn}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubBoard;
