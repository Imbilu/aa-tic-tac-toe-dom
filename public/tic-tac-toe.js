document.addEventListener("DOMContentLoaded", event => {
    const X_IMG_SRC = './images/x.png';
    const O_IMG_SRC = './images/o.png';  

    const cells = document.querySelectorAll('[data-cell]');
    let isXTurn = true;

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    function handleClick(e) {
        const cell = e.target;
        const currentClass = isXTurn ? X_IMG_SRC : O_IMG_SRC;
        placeMark(cell, currentClass);
        swapTurns();
    }

    function placeMark(cell, currentClass) {
        const img = document.createElement('img');
        img.src = currentClass;
        cell.appendChild(img);
    }

    function swapTurns() {
        isXTurn = !isXTurn;
    }

})
