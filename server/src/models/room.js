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
		this.startCountdownLength = 3;
	}

	addPlayer(io, player) {
		if (this.players.length < 2 && this.state !== "playing") {
			this.players.push(player);

			if (this.players.length === 2) {
				switch (this.state) {
					case "waiting":
						this.startGameSequence(io);
						break;
					case "paused":
						this.resumeGame(io);
						break;
				}
			}
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

	removePlayer(io, discordID) {
		const index = this.players.findIndex(
			(p) => p.getDiscordId() === discordID,
		);

		if (index !== -1) {
			this.players.splice(index, 1);

			if (
				this.currentTurn &&
				this.currentTurn.getDiscordId() === discordID
			) {
				this.currentTurn = null;
			}

			if (this.getPlayerCount() > 0) {
				this.pauseGame(io);
			}

			return { success: true, playerCount: this.getPlayerCount() };
		}

		logger.warn(`Player ${discordID} not found in room ${this.id}.`);
		return { success: false, playerCount: this.getPlayerCount() };
	}

	serializePlayers() {
		return this.players.map((player) => ({
			id: player.getDiscordId(),
			username: player.getUsername(),
			displayName: player.getDisplayName(),
			avatarHash: player.getAvatarHash(),
			piece: player.getPlayPiece(),
		}));
	}

	pauseGame(io) {
		if (this.state === "playing") {
			this.state = "paused";
			this.emitMessageToPlayers(io, "pause-game", {
				gameState: this.state,
				currentTurn: this.currentTurn,
				players: this.serializePlayers(),
				gameStartCountdown: null,
			});
		}
	}

	resumeGame(io) {
		if (this.state === "paused") {
			this.state = "playing";
			if (!this.currentTurn) {
				this.currentTurn = this.players[1]; // Set to the player who just joined
			}
			this.emitMessageToPlayers(io, "resume-game", {
				gameState: this.state,
				currentTurn: this.currentTurn.getDiscordId(),
				players: this.serializePlayers(),
				currentTime: this.currentTime,
			});
		}
	}

	startGameSequence(io) {
		let countdown = this.startCountdownLength;

		this.emitMessageToPlayers(io, "update-start-countdown", {
			gameStartCountdown: countdown,
		});

		const emissionInterval = setInterval(() => {
			countdown--;

			if (countdown === 0) {
				clearInterval(emissionInterval);
				this.startGame(io);
				logger.info({ roomID: this.id }, "Game started");
			} else {
				this.emitMessageToPlayers(io, "update-start-countdown", {
					gameStartCountdown: countdown,
				});
			}
		}, 1000);
	}

	startGame(io) {
		if (this.players.length === 2) {
			this.state = "playing";
			this.currentTurn = this.players[0];

			const payload = {
				roomID: this.id,
				gameState: this.state,
				players: this.serializePlayers(),
				currentTurn: this.currentTurn.getDiscordId(),
				currentTime: this.currentTime,
			};
			this.emitMessageToPlayers(io, "start-game", payload);

			const { currentBoardIndex, subGameStates, superBoardState } =
				this.game.getState();
			this.emitMessageToPlayers(io, "update-board", {
				currentTurn: this.currentTurn.getDiscordId(),
				currentBoardIndex,
				subGameStates,
				superBoardState,
			});
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

	getState() {
		return this.state;
	}
}

export { Room };
