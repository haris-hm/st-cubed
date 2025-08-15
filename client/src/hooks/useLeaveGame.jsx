import { useNavigate } from "react-router-dom";
import { leaveRoom } from "../util/socket/emit";
import { SocketContext } from "../context/Context";
import { initialSocketState } from "../util/socket/initSockets";
import { useContext } from "react";

export function useLeaveGame(onLeaveGame) {
	const navigate = useNavigate();
	const { value, setValue } = useContext(SocketContext);

	return () => {
		leaveRoom((success) => {
			if (success) {
				navigate("/");
				if (onLeaveGame) onLeaveGame();
				setValue(initialSocketState());
				console.log(`Value after leaving: ${JSON.stringify(value)}`); // Debugging line
			}
		});
	};
}
