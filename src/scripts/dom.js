import addBoard from './components';

// Game setup

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

const addShipToBoard = (player, shipNo) => {
  const grid = (player.difficulty === false) ? document.querySelector('.player-grid') : document.querySelector('.enemy-grid');
  const locations = player.gameboard.ships[shipNo].coords;
  locations.forEach((c) => {
    grid.childNodes.item(c[0]).childNodes.item(c[1]).classList.add('ship');
  });
};

const getRandomInt = (max) => Math.floor(Math.random() * max);

const checkPlacement = (player, shipNo, row, col, angle) => {
  const shipLength = player.gameboard.ships[shipNo].length;
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
    addShipToBoard(player, i);
  }
};

const finalizePlayerBoard = () => {
  const board = document.querySelector('.player-board');
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

const placePlayerShip = async (player) => {
  const grid = document.querySelector('.player-grid');
  let shipNo = 0;

  return new Promise((resolve) => {
    grid.childNodes.forEach((row, i) => {
      row.childNodes.forEach((col, j) => {
        col.addEventListener('click', () => {
          if (shipNo < 5 && !col.classList.contains('ship') && checkPlacement(player, shipNo, i, j, 0)) {
            console.log('added ship');
            player.gameboard.placeShip(shipNo, i, j, 0);
            addShipToBoard(player, shipNo);
            shipNo += 1;
          }
          if (shipNo > 4) {
            finalizePlayerBoard();
            resolve();
          }
        });
      });
    });
  });
};

const getPlayerShips = async (player) => {
  await placePlayerShip(player);
};

// In game

const checkSunk = (enemy, grid, row, col) => {
  const targetShip = enemy.gameboard.findShip(row, col);
  if (targetShip.isSunk()) {
    targetShip.coords.forEach((coord) => {
      grid.childNodes.item(coord[0]).childNodes.item(coord[1]).classList.add('sunk');
    });
  }
};

const updateBoard = (enemy, className, row, col) => {
  const grid = document.querySelector(`.${className}-grid`);
  const target = grid.childNodes.item(row).childNodes.item(col);
  target.classList.add('attack');
  if (enemy.gameboard.cells[row][col] === 'X') {
    target.textContent = 'X';
    checkSunk(enemy, grid, row, col);
  } else {
    target.textContent = 'O';
  }
};

const updateDialogBox = (text) => { document.querySelector('.dialog-box').firstChild.textContent = text; };

const playerMove = (opponent, row, col) => { updateBoard(opponent, 'enemy', row, col); };

const computerMove = (player, opponent) => {
  for (let i = 0; i < opponent.difficulty; i += 1) {
    const target = opponent.makeMove(player);
    updateBoard(player, 'player', target[0], target[1]);
  }
};

const rejectMoves = () => {
  const boards = document.querySelector('.board-wrapper');
  const gameoverBoards = boards.cloneNode(true);
  boards.parentNode.replaceChild(gameoverBoards, boards);
};

const revealComputerShips = () => {
  const ships = document.querySelector('.enemy-grid').querySelectorAll('.ship');
  ships.forEach((cell) => {
    if (!cell.classList.contains('attack')) {
      cell.classList.add('living-ship');
    }
  });
};

const gameover = (player) => {
  rejectMoves();
  if (player.difficulty !== false) {
    updateDialogBox('Game over. You win!');
  } else {
    revealComputerShips();
    updateDialogBox('Game over. Computer wins!');
  }
};

const playRound = (player, opponent, row, col) => {
  if (player.makeMove(opponent, row, col)) {
    playerMove(opponent, row, col);
    if (!opponent.gameboard.isGameOver()) {
      computerMove(player, opponent);
    } else {
      gameover(opponent);
    }
    if (player.gameboard.isGameOver()) { gameover(player); }
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
