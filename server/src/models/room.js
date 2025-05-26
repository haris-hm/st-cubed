import { SuperTicTacToe } from "./game.js";

/**
 * Generates a unique room ID.
 * Room IDs are a variation of the word Tic-Tac-Toe, where
 * the T's are replaced with the same random letter and the ending letter
 * of each word is replaced with a random letter.
 *
 * @returns {string} A unique room ID.
 */
function generateRoomID() {
	const letters = "BCDFGHJKLMNPQRSTVWXYZ";
	const start = letters.charAt(Math.floor(Math.random() * letters.length));
	const end = [];

	for (let i = 0; i < 3; i++) {
		end.push(
			letters
				.charAt(Math.floor(Math.random() * letters.length))
				.toLowerCase(),
		);
	}

	const roomID = `${start}i${end[0]}-${start}a${end[1]}-${start}o${end[2]}`;
	return roomID;
}

class Room {
	constructor(gameMode, timeLimit) {
		this.id = generateRoomID();
		this.gameMode = gameMode;
		this.timeLimit = timeLimit;
		this.game = new SuperTicTacToe(gameMode, timeLimit);
		this.players = [];
		this.spectators = [];
		this.currentTurn = null; // Player who is currently playing
		this.state = "waiting"; // waiting, playing, finished
	}

	addPlayer(player) {
		if (this.players.length < 2) {
			this.players.push(player);
			return true;
		}
		return false;
	}

	addSpectator(spectator) {
		if (this.spectators.length < 10) {
			this.spectators.push(spectator);
			return true;
		}
		return false;
	}

	startGame() {
		if (this.players.length === 2) {
			this.state = "playing";
			this.currentTurn = this.players[0];
		}
	}

	getID() {
		return this.id;
	}

	getPlayerCount() {
		return this.players.length;
	}

	getSpectatorCount() {
		return this.spectators.length;
	}
}

export { Room };
