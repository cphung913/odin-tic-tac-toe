const gameManager = (() => {
    let turn = 1;
    let moveCount = 0;

    function switchTurn() {
        turn == 1 ? turn = 2 : turn = 1;
        interface.changeTurn(turn);
        increaseMove();
    }

    function getTurn() {
        return turn
    }

    function increaseMove() {
        moveCount++;
        if (moveCount > 8) endGame();
    }

    function checkWin(board) {
        const winningValues = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                               [1, 4, 7], [2, 5, 8], [3, 6, 9], 
                               [1, 5, 9], [3, 5, 7]];
        let xArray = [];
        let oArray = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "X") xArray.push(i+1);
        }
        
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "O") oArray.push(i+1);
        }
        let winner;
        winningValues.forEach(x => {
            if (xArray.includes(x[0]) && xArray.includes(x[1]) && xArray.includes(x[2])) winner = 1;
        })
        winningValues.forEach(x => {
            if (oArray.includes(x[0]) && oArray.includes(x[1]) && oArray.includes(x[2])) winner = 2;
        })
        if (winner != undefined) endGame(winner);
    }

    async function endGame(winner) {
        interface.displayWinner(winner);
        moveCount = 0;
        turn = 1;
        interface.changeTurn(1);
    }

    return { getTurn, switchTurn, checkWin }
})()

const gameBoard = (() => {
    const board = document.querySelector(".board");
    const tiles = Array.from(board.childNodes).filter(x => x.nodeName != "#text");
    
    let boardValues = ["", "", "", "", "", "", "", "", ""];

    tiles.forEach(x => x.addEventListener("click", selectTile));

    function setBoard() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].textContent = boardValues[i];
            tiles[i].classList.remove("red");
            tiles[i].classList.remove("blue");
            tiles[i].classList.add(boardValues[i] == "X" ? "red" : "blue");
        }
    }
    
    function selectTile(e) {
        const index = tiles.indexOf(e.target);
        if (boardValues[index] != "") return;
        boardValues[index] = (gameManager.getTurn() == 1 ? "X" : "O");
        setBoard();
        gameManager.switchTurn();
        gameManager.checkWin(boardValues);
    }

    function resetBoard() {
        boardValues = ["", "", "", "", "", "", "", "", ""];
        setBoard()
    }

    return { resetBoard }
})()

const interface = (() => {
    const turnText = document.querySelector(".text");
    const winnerText = document.querySelector(".winner");
    const overlay = document.querySelector(".overlay");

    changeTurn(1);

    function displayWinner(winner) {
        winnerText.classList.remove("blue");
        winnerText.classList.remove("red");
        winnerText.classList.remove("neutral");
        if (winner == 1) {
            winnerText.textContent ="Player One Wins!";
            winnerText.classList.add("red");
        } else if (winner == 2) {
            winnerText.textContent ="Player Two Wins!";
            winnerText.classList.add("blue");
        } else {
            winnerText.textContent ="Draw!";
            winnerText.classList.add("neutral");
        }

        overlay.classList.add("active");
        winnerText.classList.add("active");
        setTimeout(() => overlay.addEventListener("click", endDisplay), "1000");
    }

    function changeTurn(turn) {
        turnText.classList.remove("red");
        turnText.classList.remove("blue");
        turnText.textContent = turn == 1 ? "Player One Move" : "Player Two Move";
        turnText.classList.add(turn == 1 ? "red" : "blue");
    }

    function endDisplay() {
        gameBoard.resetBoard();
        overlay.removeEventListener("click", endDisplay);
        overlay.classList.remove("active");
        winnerText.classList.remove("active");
    }

    return { displayWinner, changeTurn };
})()