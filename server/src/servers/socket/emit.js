import { Server } from "socket.io";

import { Room } from "../../models/room.js";

const START_COUNTDOWN_LENGTH = 10;

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

	const emissionInterval = setInterval(() => {
		if (countdown == 0) {
			clearInterval(emissionInterval);
			io.to(roomID).emit("start-game");
			room.startGame();
		}

		io.to(roomID).emit("update-start-countdown", {
			gameStartCountdown: countdown,
		});
		console.log(`Countdown: ${countdown}`);
		countdown--;
	}, 1000);
}

export { emitGameStartSequence };
