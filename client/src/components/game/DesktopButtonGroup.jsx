import { ShareLinkButton } from "../ui";
import { LeaveGameButton } from ".";
import { capitalizeFirstLetters } from "../../util/game/roomCode";
import { useContext } from "react";
import { SocketContext } from "../../context/Context";

function DesktopButtonGroup() {
	const { roomID } = useContext(SocketContext);
	const formattedRoomID = capitalizeFirstLetters(roomID);

	return (
		<div className="flex flex-col justify-center">
			<div className="mb-4 text-center">
				<p className="text-primary font-noto-sans text-lg font-semibold">
					Room Code: {formattedRoomID}
				</p>
			</div>
			<div className="flex flex-row items-center justify-center">
				<ShareLinkButton
					message={`Come watch me play Super Tic-Tac-Toe!\n\nJoin Code: ${formattedRoomID}`}
				/>
				<LeaveGameButton />
			</div>
		</div>
	);
}

export default DesktopButtonGroup;
