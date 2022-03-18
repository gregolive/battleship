import addBoard from './components';

const chooseDifficulty = async () => {
  const startBtns = Array.from(document.querySelectorAll('.start-btn'));

  return new Promise((resolve) => {
    startBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        addBoard();
        resolve(startBtns.indexOf(btn) + 1);
      });
    });
  });
};

const addShipsToBoard = (player) => {
  const grid = (player.difficulty === false) ? document.querySelector('.player-grid') : document.querySelector('.enemy-grid');
  player.gameboard.cells.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 'O') { grid.childNodes.item(i).childNodes.item(j).classList.add('ship'); }
    });
  });
};

const getRandomInt = (max) => Math.floor(Math.random() * max);

const checkPlacement = (player, i, row, col, angle) => {
  const shipLength = player.gameboard.ships[i].length;
  for (let j = 0; j < shipLength; j += 1) {
    let testRow;
    let testCol;
    if (angle === 0) {
      testRow = row;
      testCol = col + j;
    } else {
      testRow = row + j;
      testCol = col;
    }
    if (testRow > 9 || testCol > 9 || typeof player.gameboard.cells[testRow][testCol] !== 'undefined') { return false; }
  }
  return true;
};

const placeComputerShips = (player) => {
  for (let i = 0; i < 5; i += 1) {
    let row = getRandomInt(10);
    let col = getRandomInt(10);
    const angle = [0, 90][Math.floor(Math.random() * 2)];
    while (checkPlacement(player, i, row, col, angle) === false) {
      row = getRandomInt(10);
      col = getRandomInt(10);
    }
    player.gameboard.placeShip(i, row, col, angle);
  }
  addShipsToBoard(player);
};

const getPlayerShips = (player) => {
  player.gameboard.placeShip(0, 1, 1, 0);
  player.gameboard.placeShip(1, 3, 1, 0);
  player.gameboard.placeShip(2, 5, 1, 0);
  player.gameboard.placeShip(3, 7, 1, 0);
  player.gameboard.placeShip(4, 9, 1, 0);
  addShipsToBoard(player);
};

const updateBoard = (className, row, col) => {
  const grid = document.querySelector(`.${className}-grid`);
  const target = grid.childNodes.item(row).childNodes.item(col);
  target.textContent = 'O';
};

const playerMove = (row, col) => {
  updateBoard('enemy', row, col);
};

const computerMove = (player, opponent) => {
  for (let i = 0; i < opponent.difficulty; i += 1) {
    console.log('attacking')
    const target = opponent.makeMove(player);
    updateBoard('player', target[0], target[1]);
  }
};

const playRound = (player, opponent, row, col) => {
  if (player.makeMove(opponent, row, col)) {
    playerMove(row, col);
    if (!player.gameboard.isGameOver()) {
      computerMove(player, opponent);
    } else {
      console.log('game over');
    }
    if (opponent.gameboard.isGameOver()) {
      console.log('game over');
    }
  }
};

const acceptMoves = (player, opponent) => {
  const grid = document.querySelector('.enemy-grid');
  grid.childNodes.forEach((row, i) => {
    row.childNodes.forEach((col, j) => {
      col.addEventListener('click', () => {
        playRound(player, opponent, i, j);
      });
    });
  });
};

export {
  chooseDifficulty, getRandomInt, placeComputerShips, getPlayerShips, acceptMoves,
};
