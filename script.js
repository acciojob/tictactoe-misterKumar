document.addEventListener('DOMContentLoaded', function () {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const submitButton = document.getElementById('submit');
    const container = document.querySelector(".container");
    const table = document.querySelector('.table');
    const msg = document.querySelector('.message');
    const boardSize = 3;
    let currentPlayer;
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
  
    function startGame() {
      const player1 = player1Input.value.trim();
      const player2 = player2Input.value.trim();
  
      if (player1 === '' || player2 === '') {
        alert('Please enter names for both players.');
        return;
      }
  
      currentPlayer = player1;
      gameActive = true;
      renderBoard();
    }
  
    function renderBoard() {
      table.innerHTML = ''; // Clear existing content
  
      for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
  
        for (let j = 0; j < boardSize; j++) {
          const cell = document.createElement('td');
          const cellIndex = i * boardSize + j;
  
          cell.textContent = board[cellIndex];
          cell.addEventListener('click', () => handleCellClick(cellIndex));
          row.appendChild(cell);
        }
  
        table.appendChild(row);
      }
    }
  
    function handleCellClick(index) {

        

      
      if (!gameActive || board[index] !== '') return;
  
      board[index] = currentPlayer === player1Input.value ? 'X' : 'O';
      renderBoard();
  
      if (checkWinner()) {
        msg.classList.remove("hide")
        msg.innerText = `${currentPlayer}, congratulations, you won!`;

        gameActive = false;
      } else if (board.every(cell => cell !== '')) {
        alert('It\'s a draw!');
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === player1Input.value ? player2Input.value : player1Input.value;
      }
    }
  
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true; // We have a winner
        }
      }
  
      return false; // No winner yet
    }
  
    submitButton.addEventListener('click', startGame);
  });
  