// Define the image paths for X and O
const X_IMG_SRC = './images/x.png';
const O_IMG_SRC = './images/o.png';

// Select all cells on the board
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const newGameButton = document.getElementById('new-game');
const giveUpButton = document.getElementById('give-up');

// Initialize game state variables
let isXTurn = true;
let board = Array(9).fill(null);

// Define winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGameState();
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(cell, index), { once: true });
    });
    newGameButton.addEventListener('click', startNewGame);
    giveUpButton.addEventListener('click', giveUp);
});

// Handle cell click
function handleClick(cell, index) {
    const currentClass = isXTurn ? X_IMG_SRC : O_IMG_SRC;
    placeMark(cell, currentClass, index);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isTie()) {
        endGame(true);
    } else {
        swapTurns();
    }
    saveGameState();
}

// Place X or O mark on the board
function placeMark(cell, currentClass, index) {
    const img = document.createElement('img');
    img.src = currentClass;
    cell.appendChild(img);
    board[index] = currentClass;
}

// Swap turns between X and O
function swapTurns() {
    isXTurn = !isXTurn;
}

// Check if there is a winner
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] === currentClass;
        });
    });
}

// Check if the game is a tie
function isTie() {
    return board.every(cell => cell !== null);
}

// End the game (either tie or winner)
function endGame(tie) {
    if (tie) {
        gameStatus.innerText = 'Winner: None';
    } else {
        gameStatus.innerText = `Winner: ${isXTurn ? 'X' : 'O'}`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
    newGameButton.disabled = false;
    giveUpButton.disabled = true;
    saveGameState();
}

// Start a new game
function startNewGame() {
    isXTurn = true;
    board = Array(9).fill(null);
    gameStatus.innerText = '';
    cells.forEach((cell, index) => {
        cell.innerHTML = '';
        cell.addEventListener('click', () => handleClick(cell, index), { once: true });
    });
    newGameButton.disabled = true;
    giveUpButton.disabled = false;
    saveGameState();
}

// Handle player giving up
function giveUp() {
    const winner = isXTurn ? 'O' : 'X';
    gameStatus.innerText = `Winner: ${winner}`;
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
    newGameButton.disabled = false;
    giveUpButton.disabled = true;
    saveGameState();
}

// Save game state to local storage
function saveGameState() {
    const gameState = {
        isXTurn,
        board,
        gameStatus: gameStatus.innerText,
        newGameButtonDisabled: newGameButton.disabled,
        giveUpButtonDisabled: giveUpButton.disabled,
    };
    localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
}

// Load game state from local storage
function loadGameState() {
    const savedGameState = localStorage.getItem('ticTacToeGameState');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        isXTurn = gameState.isXTurn;
        board = gameState.board;
        gameStatus.innerText = gameState.gameStatus;
        newGameButton.disabled = gameState.newGameButtonDisabled;
        giveUpButton.disabled = gameState.giveUpButtonDisabled;
        cells.forEach((cell, index) => {
            cell.innerHTML = '';
            if (board[index] !== null) {
                const img = document.createElement('img');
                img.src = board[index];
                cell.appendChild(img);
                cell.removeEventListener('click', handleClick);
            } else {
                cell.addEventListener('click', () => handleClick(cell, index), { once: true });
            }
        });
    }
}
