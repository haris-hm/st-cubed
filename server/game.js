class BoardState {
    static X = 'X';
    static O = 'O';
    static DRAW = 'DRAW';
    static UNCLAIMED = 'UNCLAIMED';

    static getNextPlayer(player) {
        return player === this.X ? this.O : this.X;
    }
}

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
    }

    makeMove(position, player) {
        if (this.board[position] === null) {
            this.board[position] = player;
            return true;
        }
        return false;
    }

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        });

        return this.isDraw();
    }

    isDraw() {
        return this.board.every(cell => cell !== null) ? BoardState.DRAW : BoardState.UNCLAIMED;
    }

    getState(){
        return {
            board: this.board,
        };
    }
}

class SuperTicTacToe {
    constructor() {
        this.boards = Array(9).fill(null).map(() => new TicTacToe());
        this.superBoard = new TicTacToe();
        this.currentPlayer = BoardState.X;
        this.currentBoardIndex = null;
    }

    switchPlayer() {
        this.currentPlayer = BoardState.getNextPlayer(this.currentPlayer)
    }

    makeMove(position) {
        const board = this.boards[this.boardIndex];
        const moveResult = board.makeMove(position, this.currentPlayer);
        
        if (moveResult) {
            this.switchPlayer();
            this.#setNextBoardIndex(position)
        }
        else {
            const winner = board.checkWinner();

            if (winner) {
                this.superBoard.makeMove(this.boardIndex, winner)
            }
        }
    }

    checkWinner() {
        const winner = this.superBoard.checkWinner()

        if (winner !== BoardState.UNCLAIMED) {
            switch (winner) {
                case (BoardState.X):
                    break;
                case (BoardState.O):
                    break;
                case (BoardState.DRAW):
                    break;
            }
        }
    }

    #setNextBoardIndex(boardIndex) {
        if (this.superBoard.checkWinner() === BoardState.UNCLAIMED) {
            this.boardIndex = boardIndex;
        }
        else {
            this.boardIndex = null;
        }
    }

    setBoardIndex(newIndex) {
        if (this.boardIndex === null) {
            this.boardIndex = newIndex;
        }
        else {
            throw new Error(`Cannot set board index as the current index is not null. The current index is ${this.boardIndex}.`)
        }
    }

    getBoardIndex() {
        return this.getBoardIndex;
    }

    getState() {
        return {
            currentPlayer: this.currentPlayer,
            currentBoardIndex: this.boardIndex,
            subGameStates: this.boards.map(board => board.getState().board),
            superBoardState: this.superBoard.getState().board,
        };
    }
}

export { SuperTicTacToe, TicTacToe };
