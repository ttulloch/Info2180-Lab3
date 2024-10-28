document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('#board div');
    const status = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    squares.forEach((square, index) => {
      square.classList.add('square');

      square.addEventListener('click', () => {
        if (gameActive && square.textContent === '') {
          square.textContent = currentPlayer;
          square.classList.add(currentPlayer);
          boardState[index] = currentPlayer;
  
          if (checkWinner(currentPlayer)) {
            status.classList.add('you-won');
            status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            gameActive = false;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      });
 
      square.addEventListener('mouseover', () => {
        if (square.textContent === '') {
          square.classList.add('hover');
        }
      });
  
      square.addEventListener('mouseout', () => {
        square.classList.remove('hover');
      });
    });
  
    newGameButton.addEventListener('click', () => {
      boardState = ['', '', '', '', '', '', '', '', ''];
      squares.forEach((square) => {
        square.textContent = '';
        square.classList.remove('X', 'O');
      });
      status.classList.remove('you-won');
      status.textContent = 'Move your mouse over a square and click to play an X or an O.';
      currentPlayer = 'X';
      gameActive = true;
    });
  
    function checkWinner(player) {
      const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6], 
      ];
  
      return winningCombinations.some((combination) => {
        return combination.every((index) => {
          return boardState[index] === player;
        });
      });
    }
  });
  