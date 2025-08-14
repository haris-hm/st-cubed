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

		this.game = new SuperTicTacToe();
		this.gameMode = gameMode;
		this.timeLimit = timeLimit;

		this.playerX = null;
		this.playerO = null;
		this.lastJoinedPlayer = null;
		this.spectators = [];

		this.currentTurn = null; // Player who is currently playing
		this.currentTime = this.timeLimit === "unlimited" ? -1 : this.timeLimit; // Current time in seconds

		this.state = "waiting"; // waiting, playing, finished
		this.startCountdownLength = 3;
	}

	addPlayer(io, user) {
		if (this.state === "playing") {
			logger.warn(
				`Player ${player.getDiscordId()} attempted to join room ${this.id} while it was in progress.`,
			);
			return false;
		}

		if (this.playerX === null) {
			this.playerX = user.getPlayer("X");
			this.lastJoinedPlayer = 1;
		} else if (this.playerO === null) {
			this.playerO = user.getPlayer("O");
			this.lastJoinedPlayer = 2;
		} else {
			logger.warn(
				`Room ${this.id} is full. Player ${player.getDiscordId()} cannot join.`,
			);
			return false;
		}

		if (this.getPlayerCount() === 2) {
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

	addSpectator(spectator) {
		if (this.spectators.length < 10) {
			this.spectators.push(spectator);
			return true;
		}
		return false;
	}

	addUser(io, user) {
		if (this.getPlayerCount() >= 2) {
			this.addSpectator(user);
		} else {
			this.addPlayer(io, user);
		}
	}

	handlePlayerLeave(io, discordID) {
		if (this.playerX && this.playerX.getDiscordId() === discordID) {
			this.playerX = null;
		} else if (this.playerO && this.playerO.getDiscordId() === discordID) {
			this.playerO = null;
		} else {
			logger.warn(`Player ${discordID} not found in room ${this.id}.`);
			return { success: false, playerCount: this.getPlayerCount() };
		}

		if (this.state === "playing" && this.getPlayerCount() > 0) {
			if (
				this.currentTurn &&
				this.currentTurn.getDiscordId() === discordID
			) {
				this.currentTurn = null;
			}

			this.pauseGame(io);
		}

		return { success: true, playerCount: this.getPlayerCount() };
	}

	pauseGame(io) {
		if (this.state === "playing") {
			this.state = "paused";

			const payload = {
				gameState: this.state,
				currentTurn: this.currentTurn
					? this.currentTurn.getDiscordId()
					: null,
				players: this.serializePlayers(),
				gameStartCountdown: null,
			};

			this.emitMessageToPlayers(io, "pause-game", payload);
		}
	}

	resumeGame(io) {
		if (this.state === "paused") {
			this.state = "playing";
			if (!this.currentTurn) {
				// If there is no current turn, set it to the last joined player
				this.currentTurn =
					this.lastJoinedPlayer === 1 ? this.playerX : this.playerO;
			}

			const payload = {
				gameState: this.state,
				currentTurn: this.currentTurn.getDiscordId(),
				players: this.serializePlayers(),
				currentTime: this.currentTime,
			};

			this.emitMessageToPlayers(io, "resume-game", payload);
			this.sendBoardUpdate(io);
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
		if (this.getPlayerCount() === 2) {
			this.state = "playing";
			this.currentTurn = this.playerX;

			const payload = {
				roomID: this.id,
				gameState: this.state,
				players: this.serializePlayers(),
				currentTurn: this.currentTurn.getDiscordId(),
				currentTime: this.currentTime,
			};
			this.emitMessageToPlayers(io, "start-game", payload);
			this.sendBoardUpdate(io);
		}
	}

	sendBoardUpdate(io) {
		const { currentBoardIndex, subGameStates, superBoardState } =
			this.game.getState();
		const payload = {
			currentTurn: this.currentTurn.getDiscordId(),
			currentBoardIndex,
			subGameStates,
			superBoardState,
		};

		this.emitMessageToPlayers(io, "update-board", payload);
	}

	validateMoveData(userID, boardIndex, position) {
		if (userID !== this.currentTurn.getDiscordId()) {
			logger.warn(
				`Player ${userID} attempted to make a move out of turn in room ${this.id}.`,
			);
			return false;
		}

		if (this.state !== "playing") {
			logger.warn(
				`Player ${userID} attempted to make a move in room ${this.id} while it was not in progress.`,
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
		const nextPlayer = this.getPlayers().find(
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

	serializePlayers() {
		return this.getPlayers().map((player) => ({
			id: player.getDiscordId(),
			username: player.getUsername(),
			displayName: player.getDisplayName(),
			avatarHash: player.getAvatarHash(),
			piece: player.getPlayPiece(),
		}));
	}

	getID() {
		return this.id;
	}

	getPlayers() {
		return [this.playerX, this.playerO].filter(Boolean);
	}

	getPlayerCount() {
		return this.getPlayers().length;
	}

	getSpectatorCount() {
		return this.spectators.length;
	}

	getState() {
		return this.state;
	}
}

export { Room };
