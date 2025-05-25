import { SuperTicTacToe } from "./game.js";

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

class Room {
    constructor(id, gameMode, timeLimit) {
        this.id = id;
        this.gameMode = gameMode;
        this.timeLimit = timeLimit;
        this.game = new SuperTicTacToe(gameMode, timeLimit);
        this.players = [];
        this.spectators = [];
        this.currentTurn = null; // Player who is currently playing
        this.state = 'waiting'; // waiting, playing, finished
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
            this.state = 'playing';
            this.currentTurn = this.players[0];
        }
    }

    getPlayerCount() {
        return this.players.length;
    }

    getSpectatorCount() {
        return this.spectators.length;
    }
}

export { User, Room, Player };