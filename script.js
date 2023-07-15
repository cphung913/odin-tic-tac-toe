const gameManager = (() => {
    let turn = 1;
    let moveCount = 0;

    function switchTurn() {
        turn == 1 ? turn = 2 : turn = 1;
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

    function endGame(winner) {
        moveCount = 0;
        turn = 1;
        gameBoard.resetBoard()
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
        }
    }
    
    function selectTile(e) {
        const index = tiles.indexOf(e.target);
        if (boardValues[index] != "") return;
        boardValues[index] = (gameManager.getTurn() == 1 ? "X" : "O");
        setBoard();
        gameManager.switchTurn();
        console.log(gameManager.checkWin(boardValues));
    }

    function resetBoard() {
        boardValues = ["", "", "", "", "", "", "", "", ""];
        setBoard()
    }

    return { resetBoard }
})()