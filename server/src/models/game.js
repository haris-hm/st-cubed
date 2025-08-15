import { v4 as uuidv4 } from "uuid";

class BoardState {
	static X = "X";
	static O = "O";
	static DRAW = "DRAW";
	static UNCLAIMED = "UNCLAIMED";

	static getNextPlayer(player) {
		return player === this.X ? this.O : this.X;
	}
}

class TicTacToe {
	constructor() {
		this.board = Array(9).fill(BoardState.UNCLAIMED);
		this.winState = {
			player: BoardState.UNCLAIMED,
			winningCombination: null,
		};
	}

	makeMove(position, player) {
		if (this.board[position] === BoardState.UNCLAIMED) {
			this.board[position] = player;
		}
		this.checkWinner();
		return this.winState;
	}

	checkWinner() {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // rows
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // columns
			[0, 4, 8],
			[2, 4, 6], // diagonals
		];

		let winner = BoardState.UNCLAIMED;
		let winningCombination = null;

		winningCombinations.forEach((combination) => {
			const [a, b, c] = combination;
			if (
				this.board[a] !== BoardState.UNCLAIMED &&
				this.board[a] === this.board[b] &&
				this.board[a] === this.board[c]
			) {
				winner = this.board[a];
				winningCombination = combination;
			}
		});

		if (!winningCombination && this.isDraw()) {
			winner = BoardState.DRAW;
		}

		this.winState = {
			player: winner,
			winningCombination: winningCombination,
		};
	}

	isDraw() {
		return this.board.every((cell) => cell !== BoardState.UNCLAIMED);
	}

	getState() {
		return {
			board: this.board,
			winState: this.winState,
		};
	}

	validatePosition(position) {
		if (this.winState.player !== BoardState.UNCLAIMED) {
			return {
				response: false,
				message: "Game already won or drawn",
			};
		}

		if (position < 0 || position > 8) {
			return {
				response: false,
				message: "Invalid position. Must be between 0 and 8",
			};
		} else if (this.board[position] !== BoardState.UNCLAIMED) {
			return { response: false, message: "Position already taken" };
		}

		return { response: true, message: "" };
	}
}

class SuperTicTacToe {
	constructor() {
		this.uuid = uuidv4();
		this.boards = Array(9)
			.fill(null)
			.map(() => new TicTacToe());
		this.superBoard = new TicTacToe();
		this.currentPlayer = BoardState.X;
		this.currentBoardIndex = -1; // -1 indicates no board is currently selected
	}

	switchPlayer() {
		this.currentPlayer = BoardState.getNextPlayer(this.currentPlayer);
	}

	makeMove(position, boardIndex) {
		if (this.currentBoardIndex === -1) {
			this.currentBoardIndex = boardIndex;
		} else if (this.currentBoardIndex !== boardIndex) {
			throw new Error(
				`Cannot make a move on board ${boardIndex} when the current board being played is ${this.currentBoardIndex}`,
			);
		}

		const board = this.boards[this.currentBoardIndex];
		const moveResult = board.makeMove(position, this.currentPlayer);
		const winnerResult = moveResult.player;

		if (winnerResult !== BoardState.UNCLAIMED) {
			this.superBoard.makeMove(this.currentBoardIndex, winnerResult);
		}

		this.switchPlayer();
		this.#setNextBoardIndex(position);

		return this.getState();
	}

	#setNextBoardIndex(boardIndex) {
		if (
			this.boards[boardIndex].getState().winState.player ===
			BoardState.UNCLAIMED
		) {
			this.currentBoardIndex = boardIndex;
		} else {
			this.currentBoardIndex = -1;
		}
	}

	validateMove(boardIndex, position) {
		if (
			this.currentBoardIndex !== -1 &&
			boardIndex !== this.currentBoardIndex
		) {
			return {
				response: false,
				message: `Cannot make a move on board ${boardIndex} when the current board being played is ${this.currentBoardIndex}`,
			};
		} else if (boardIndex < 0 || boardIndex > 8) {
			return {
				response: false,
				message: "Invalid board index. Must be between 0 and 8",
			};
		}

		const validPosition =
			this.boards[boardIndex].validatePosition(position);

		if (validPosition.response === false) {
			return validPosition;
		}

		return { response: true, message: "" };
	}

	getBoardIndex() {
		return this.currentBoardIndex;
	}

	getState() {
		return {
			currentPlayerPiece: this.currentPlayer,
			currentBoardIndex: this.currentBoardIndex,
			subGameStates: this.boards.map((board) => board.getState()),
			superBoardState: this.superBoard.getState(),
		};
	}

	getBoardID() {
		return this.uuid;
	}
}

export { SuperTicTacToe, TicTacToe };
