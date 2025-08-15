import logger from "./logger.js";

class User {
	constructor(discordId, socketId, username, displayName, avatarHash) {
		this.discordId = discordId;
		this.socketId = socketId;
		this.username = username;
		this.displayName = displayName;
		this.avatarHash = avatarHash;
		this.currentRoom = null;
	}

	getDiscordId() {
		return this.discordId;
	}

	getSocketId() {
		return this.socketId;
	}

	getUsername() {
		return this.username;
	}

	getDisplayName() {
		return this.displayName;
	}

	getAvatarHash() {
		return this.avatarHash;
	}

	getCurrentRoom() {
		if (!this.currentRoom) {
			return null;
		}
		return this.currentRoom;
	}

	joinRoom(room) {
		this.currentRoom = room;
	}

	/**
	 * Makes a player object out of this user with the given playPiece
	 * @param {string} playPiece - The piece the player will play with (X or O)
	 * @returns {Player} The player object
	 */
	getPlayer(playPiece) {
		return new Player(
			this.discordId,
			this.socketId,
			this.username,
			this.displayName,
			this.avatarHash,
			playPiece,
		);
	}
}

class Player extends User {
	constructor(
		discordId,
		socketId,
		username,
		displayName,
		avatarHash,
		playPiece,
	) {
		super(discordId, socketId, username, displayName, avatarHash);
		this.playPiece = playPiece; // X or O
		this.active = false;
		this.playAgain = false;
	}

	setActive(active) {
		this.active = active;
	}

	setPlayAgain(playAgain) {
		this.playAgain = playAgain;
	}

	getPlayPiece() {
		return this.playPiece;
	}

	isActive() {
		return this.active;
	}

	requestedPlayAgain() {
		return this.playAgain;
	}
}

export { User, Player };
