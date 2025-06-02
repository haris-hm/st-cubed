import { SuperTicTacToe } from "./game.js";
import logger from "./logger.js";

/**
 * Generates a unique room ID.
 * Room IDs are a variation of the word Tic-Tac-Toe, where
 * the T's are replaced with the same random letter and the ending letter
 * of each word is replaced with a random letter.
 *
 * @returns {string} A unique room ID.
 */
function generateRoomID() {
	const letters = "bcdfghjklmnpqrstvwxyz";
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
		this.game = new SuperTicTacToe();
		this.players = [];
		this.spectators = [];
		this.currentTurn = null; // Player who is currently playing
		this.currentTime = this.timeLimit === "unlimited" ? -1 : this.timeLimit; // Current time in seconds
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

	startGame(io) {
		if (this.players.length === 2) {
			this.state = "playing";
			this.currentTurn = this.players[0];

			const payload = {
				roomID: this.id,
				players: this.players.map((player) => ({
					id: player.getDiscordId(),
					username: player.getUsername(),
					displayName: player.getDisplayName(),
					avatarHash: player.getAvatarHash(),
					piece: player.getPlayPiece(),
				})),
				currentTurn: this.currentTurn.getDiscordId(),
				currentTime: this.currentTime,
			};
			this.emitMessageToPlayers(io, "start-game", payload);
		}
	}

	validateMoveData(userID, boardIndex, position) {
		if (userID !== this.currentTurn.getDiscordId()) {
			logger.warn(
				`Player ${userID} attempted to make a move out of turn in room ${this.id}.`,
			);
			return false;
		}

		const validMove = this.game.validateMove(boardIndex, position);

		if (!validMove.response) {
			logger.warn(
				`Player ${userID} made an invalid move in room ${this.id}: ${validMove.message}.`,
			);
			return false;
		}

		return true;
	}

	makeMove(io, userID, boardIndex, position) {
		const validMove = this.validateMoveData(userID, boardIndex, position);
		if (!validMove) {
			return false;
		}

		const {
			currentPlayerPiece,
			currentBoardIndex,
			subGameStates,
			superBoardState,
		} = this.game.makeMove(position, boardIndex);

		const turnSet = this.setCurrentTurn(currentPlayerPiece);

		if (turnSet) {
			this.emitMessageToPlayers(io, "update-board", {
				currentTurn: this.currentTurn.getDiscordId(),
				currentBoardIndex,
				subGameStates,
				superBoardState,
			});
			return true;
		} else {
			logger.error(
				`Failed to set current turn for player ${userID} in room ${this.id}.`,
			);
			return false;
		}
	}

	setCurrentTurn(playPiece) {
		const nextPlayer = this.players.find(
			(player) => player.getPlayPiece() === playPiece,
		);
		if (nextPlayer) {
			this.currentTurn = nextPlayer;
			return true;
		}
		return false;
	}

	emitMessageToPlayers(io, method, data = null) {
		if (data) {
			io.to(this.id).emit(method, data);
		} else {
			io.to(this.id).emit(method);
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
