import logger from "./logger.js";

class User {
	constructor(discordId, socketId, name, avatarHash) {
		this.discordId = discordId;
		this.socketId = socketId;
		this.username = name;
		this.avatarHash = avatarHash;
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

	getAvatarHash() {
		return this.avatarHash;
	}

	/**
	 * Makes a player object out of this user with the given playPiece
	 * @param {string} playPiece - The piece the player will play with (X or O)
	 * @returns {Player} - The player object
	 */
	getPlayer(playPiece) {
		return new Player(
			this.discordId,
			this.socketId,
			this.username,
			this.avatarHash,
			playPiece,
		);
	}
}

class Player extends User {
	constructor(discordId, socketId, name, avatarHash, playPiece) {
		super(discordId, socketId, name, avatarHash);
		this.playPiece = playPiece; // X or O
	}

	getPlayPiece() {
		return this.playPiece;
	}
}

export { User, Player };
