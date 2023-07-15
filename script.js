const gameBoard = (() => {
    let boardValues = ["", "", "", "", "", "", "", "", ""];
    const board = document.querySelector(".board");
    const tiles = Array.from(board.childNodes).filter(x => x.nodeName != "#text");
    function setBoard() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].textContent = boardValues[i];
        }
    }

    return { setBoard }
})()

gameBoard.setBoard();