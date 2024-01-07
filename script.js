function Cell() {
    let value = null;

    const addMarker = (marker) => {
        value = marker;
    };

    const getValue = () => value;

    return {
        addMarker,
        getValue,
    };
}

const Gameboard = (function () {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.table(boardValues);
    };

    const placeMarker = (row, column, marker) => {
        board[row][column].addMarker(marker);
    };

    return {
        getBoard,
        printBoard,
        placeMarker,
    };
})();

const GameController = (function (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {

    const players = [
        { name: playerOneName, marker: "X" },
        { name: playerTwoName, marker: "O" },
    ];


    
    let currentPlayer = players[0];
    
    const switchCurrentPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    
    const getCurrentPlayerTurn = () => currentPlayer;
    
    const changePlayerNames = (playerOneName, playerTwoName) => {
        players[0].name = playerOneName;
        players[1].name = playerTwoName;
    }
    
    let rowX = new Array(3).fill(0);
    let colX = new Array(3).fill(0);
    let diagX = 0;
    let antiDiagX = 0;

    let rowO = new Array(3).fill(0);
    let colO = new Array(3).fill(0);
    let diagO = 0;
    let antiDiagO = 0;

    const checkWin = (row, column) => {
        if (getCurrentPlayerTurn().marker === "X") {
            rowX[row]++;
            colX[column]++;
            if (row === column) diagX++;
            if (parseInt(row) + parseInt(column) === 2) antiDiagX++;
        } else {
            rowO[row]++;
            colO[column]++;
            if (row === column) diagO++;
            if (parseInt(row) + parseInt(column) == 2) antiDiagO++;
        }
        if (
            rowX[row] === 3 ||
            colX[column] === 3 ||
            diagX === 3 ||
            antiDiagX === 3 ||
            rowO[row] === 3 ||
            colO[column] === 3 ||
            diagO === 3 ||
            antiDiagO === 3
        ) {
            return true;
        } else {
            return false;
        }
    };

    let moveCount = 0;
    const checkTie = () => {
        ++moveCount;
        if (moveCount === 9) {
            return true;
        } else return false;
    }

    let gameWon = false;
    let gameTied = false;

    const getGameWon = () => gameWon;
    const getGameTied = () => gameTied;

    const playRound = (row, column) => {
        let board = Gameboard.getBoard();
        if (board[row][column].getValue() === null && gameWon === false) {
            Gameboard.placeMarker(row, column, getCurrentPlayerTurn().marker);
            Gameboard.printBoard();
            if (checkWin(row, column) === true) {
                gameWon = true;
            }
            if (checkTie()) gameTied = true;
            if (!gameWon) switchCurrentPlayerTurn();
        }
    };

    return {
        playRound,
        getCurrentPlayerTurn,
        getGameWon,
        getGameTied,
        changePlayerNames
    };
})();

// make this work
const displayController = (function () {
    const game = GameController;

    const board = Gameboard.getBoard();

    const infoDisplay = document.querySelector('.game-info');
    infoDisplay.textContent = ``
    const boardDisplay = document.querySelector(".board");
    const updateCellDisplay = () => {
        boardDisplay.textContent = "";
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellDisplay = document.createElement("button");
                cellDisplay.className = "cell";
                cellDisplay.dataset.row = [row];
                cellDisplay.dataset.column = [col];
                cellDisplay.textContent = board[row][col].getValue();
                boardDisplay.appendChild(cellDisplay);
            }
        }
    };


    function clickHandlerBoard(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.column;
        game.playRound(row, col);
        updateCellDisplay();
        if (game.getGameWon()) {
            infoDisplay.textContent = `${game.getCurrentPlayerTurn().name} won!`
        } else if (game.getGameTied()) {
            infoDisplay.textContent = `It's a tie!`
        } else {
            infoDisplay.textContent = `${game.getCurrentPlayerTurn().name}'s turn`
        }
    }

    boardDisplay.addEventListener('click', clickHandlerBoard);

    const getPlayerInputs = () => {
        const playerOneInput = document.querySelector('#player-one').value;
        const playerTwoInput = document.querySelector('#player-two').value;
        const inputs = [playerOneInput, playerTwoInput];
        return inputs;
    }

    const startButton = document.querySelector('.start');

    function clickHandlerButton() {
        const [playerOneName, playerTwoName] = getPlayerInputs();
        GameController.changePlayerNames(playerOneName, playerTwoName);
        displayController.updateCellDisplay();
    }

    startButton.addEventListener('click', clickHandlerButton)

    return {
        updateCellDisplay,
        getPlayerInputs
    };
})();