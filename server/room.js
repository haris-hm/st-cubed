import { SuperTicTacToe } from "./game.js";

class User {
    constructor(discordId, name) {
        this.discordId = discordId;
        this.username = name;
    }

    getDiscordId() {
        return this.discordId;
    }

    getUsername() {
        return this.username;
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

    getPlayerCount() {
        return this.players.length;
    }

    getSpectatorCount() {
        return this.spectators.length;
    }
}

export { User, Room, Player };