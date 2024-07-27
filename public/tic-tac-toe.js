document.addEventListener("DOMContentLoaded", event => {
    const X_IMG_SRC = './images/x.png';
    const O_IMG_SRC = './images/o.png';  

    const cells = document.querySelectorAll('[data-cell]');
    const newGameButton = document.getElementById('new-game');
    const gameStatus = document.getElementById('gameStatus');
    let isXTurn = true;
    let board = Array(9).fill(null);

    // A 2d array with the index positions for all possible winning combos
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

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(cell, index), { once: true });
    });

    newGameButton.addEventListener('click', startNewGame);

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
    }

    function placeMark(cell, currentClass, index) {
        const img = document.createElement('img');
        img.src = currentClass;
        cell.appendChild(img);
        board[index] = currentClass;
    }

    function swapTurns() {
        isXTurn = !isXTurn;
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return board[index] === currentClass;
            });
        });
    }

    function isTie() {
        return board.every(cell => cell !== null);
    }

    function endGame(tie) {
        if (tie) {
            gameStatus.innerText = 'Winner: None';
        } else {
            gameStatus.innerText = `Winner: ${isXTurn ? 'X' : 'O'}`;
        }
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
        newGameButton.disabled = false;
    }

    function startNewGame() {
        isXTurn = true;
        board = Array(9).fill(null);
        gameStatus.innerText = '';
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.addEventListener('click', () => handleClick(cell, index), { once: true });
        });
        newGameButton.disabled = true;
    }

})
