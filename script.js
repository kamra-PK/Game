const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) return;
    
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

status.textContent = `Player ${currentPlayer}'s turn`;
