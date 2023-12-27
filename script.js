function createCell() {
    let value = '.';

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
            board[i].push(createCell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardValues);
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


function GameController(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    const players = [
        { name: playerOneName, marker: 'X'},
        { name: playerTwoName, marker: 'O'}
    ];
    let currentPlayer = players[0];

    const switchCurrentPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }

    const getCurrentPlayerTurn = () => currentPlayer;

    return {
        switchCurrentPlayerTurn,
        getCurrentPlayerTurn
    }

}