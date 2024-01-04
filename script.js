function Cell() {
    let value = null;

    const addMarker = (marker) => {
        value = marker;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue,
    }
}

const Gameboard = (function() {
    const rows = 3;
    const cols = 3;
    const board = [];
 
    for (let i=0; i < rows; i++) {
        board[i] = [];
        for(let j=0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardValues);
    }

    const placeMarker = (row, column, marker) => {
        board[row][column].addMarker(marker);
    }

    return {
        getBoard,
        printBoard,
        placeMarker
    }
})();


const GameController = (function(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const players = [
        { name: playerOneName, marker: 'X'},
        { name: playerTwoName, marker: 'O'}
    ];
    let currentPlayer = players[0];

    const switchCurrentPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const getCurrentPlayerTurn = () => currentPlayer;
    
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
            if (row + column === 2) antiDiagX++;
        } else {
            rowO[row]++;
            colO[row]++;
            if (row === column) diagO++;
            if (row + column === 2) antiDiagO++;
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

    let gameWon = false;

    const playRound = (row, column) => {
        let board = Gameboard.getBoard();
        if (board[row][column].getValue() === null && gameWon === false) {
            Gameboard.placeMarker(row, column, getCurrentPlayerTurn().marker);
            Gameboard.printBoard();
            if (checkWin(row, column) === true) {
                console.log(`${getCurrentPlayerTurn().marker} won`)
                gameWon = true;
            }
            switchCurrentPlayerTurn();
        }
    }


    return {
        playRound,
        getCurrentPlayerTurn,
    }

})();

//play round function
// take current player, and marker, placemarker with currentplayer marker, then switch playerturn