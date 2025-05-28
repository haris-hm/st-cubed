import { Server } from "socket.io";

import logger from "../../models/logger.js";
import { Room } from "../../models/room.js";

const START_COUNTDOWN_LENGTH = 3; // 10; normally 10 seconds, but for testing purposes we set it to 3 seconds

/**
 * Emits a game start sequence to all players in the specified room.
 *
 * @param {Object} context Context object containing shared resources.
 * @param {Server} context.io Socket.IO instance.
 * @param {Map<string, Room>} context.currentRooms Map of current rooms.
 * @param {string} context.roomID ID of the room to emit the game start sequence.
 */
function emitGameStartSequence({ io, currentRooms, roomID }) {
	const room = currentRooms.get(roomID);
	let countdown = START_COUNTDOWN_LENGTH;

	room.emitMessageToPlayers(io, "update-start-countdown", {
		gameStartCountdown: countdown,
	});

	const emissionInterval = setInterval(() => {
		countdown--;

		if (countdown === 0) {
			clearInterval(emissionInterval);
			room.startGame(io);
			logger.info({ roomID: roomID }, "Game started");
		} else {
			room.emitMessageToPlayers(io, "update-start-countdown", {
				gameStartCountdown: countdown,
			});
		}
	}, 1000);
}

export { emitGameStartSequence };
