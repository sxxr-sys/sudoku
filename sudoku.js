let numSelected = null;
let tileSelected = null;
let errors = 0;

let board = []; 
let solution = []; 

window.onload = function () {
    generateSudoku();
    setGame();
};


function generateSudoku() {
    solution = generateSudokuSolution(); 
    board = createPuzzleFromSolution(solution); 
}


function generateSudokuSolution() {
    
    
    return [
        "387491625",
        "241568379",
        "569327418",
        "758619234",
        "123784596",
        "496253187",
        "934176852",
        "675832941",
        "812945763"
    ];
}


function createPuzzleFromSolution(solution) {
    let puzzle = [...solution];
    
    
    for (let i = 0; i < 40; i++) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        
        
        puzzle[r] = puzzle[r].slice(0, c) + '-' + puzzle[r].slice(c + 1);
    }
    
    return puzzle;
}


function setGame() {
    createDigitButtons();
    createBoard();
}


function createDigitButtons() {
    const digitsContainer = document.getElementById("digits");

    for (let i = 1; i <= 9; i++) {
        let numberButton = document.createElement("div");
        numberButton.id = `number-${i}`;
        numberButton.innerText = i;
        numberButton.classList.add("number");
        numberButton.addEventListener("click", selectNumber);
        digitsContainer.appendChild(numberButton);
    }
}


function createBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; 

    board.forEach((row, r) => {
        [...row].forEach((cell, c) => {
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");

            
            if (cell !== "-") {
                tile.innerText = cell;
                tile.classList.add("tile-start");
            }

            
            if (r === 2 || r === 5) tile.classList.add("horizontal-line");
            if (c === 2 || c === 5) tile.classList.add("vertical-line");

            tile.addEventListener("click", selectTile);
            boardContainer.appendChild(tile);
        });
    });
}


function selectNumber() {
    if (numSelected) numSelected.classList.remove("number-selected");

    numSelected = this;
    numSelected.classList.add("number-selected");
}


function selectTile() {
    if (!numSelected || this.innerText !== "") return;

    const [r, c] = this.id.split("-").map(Number);
    
    
    if (solution[r][c] === numSelected.innerText) {
        this.innerText = numSelected.innerText;
    } else {
        errors++;
        document.getElementById("errors").innerText = `Errors: ${errors}`;
    }
}
