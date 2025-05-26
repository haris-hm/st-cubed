class User {
	constructor(discordId, socketId, name) {
		this.discordId = discordId;
		this.socketId = socketId;
		this.username = name;
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

	/**
	 * Makes a player object out of this user with the given playPiece
	 * @param {string} playPiece - The piece the player will play with (X or O)
	 * @returns {Player} - The player object
	 */
	getPlayer(playPiece) {
		return new Player(this.discordId, this.username, playPiece);
	}
}

class Player extends User {
	constructor(discordId, name, playPiece) {
		super(discordId, name);
		this.playPiece = playPiece; // X or O
		this.isPlayersTurn = false;
	}
}

export { User, Player };
