import addBoard from './components';

// Dialog box

const updateDialogBox = (text) => { document.querySelector('.dialog-box').firstChild.textContent = text; };

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

const domNewShip = (grid, pieceCoords) => {
  const domGrid = document.querySelector(grid);
  pieceCoords.forEach((coord) => {
    domGrid.childNodes.item(coord[0]).childNodes.item(coord[1]).classList.add('ship');
  });
};

const finalizePlayerBoard = () => {
  const board = document.querySelector('.player-board');
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

const placePlayerShip = async (player) => {
  const grid = document.querySelector(player.grid);
  let shipNo = 0;
  updateDialogBox(`Place your ${player.gameboard.ships[shipNo].name}.`);

  return new Promise((resolve) => {
    grid.childNodes.forEach((row, i) => {
      row.childNodes.forEach((col, j) => {
        col.addEventListener('click', () => {
          if (player.checkShipPlacement(shipNo, i, j, 0)) {
            player.placeNewShip(shipNo, i, j, 0);
            updateDialogBox(`Place your ${player.gameboard.ships[shipNo].name}.`);
            shipNo += 1;
          }
          if (shipNo > 4) {
            finalizePlayerBoard();
            updateDialogBox('Your move first. Click to fire a shot!');
            resolve();
          }
        });
      });
    });
  });
};

const getPlayerShips = async (player) => { await placePlayerShip(player); };

// In game

const checkSunk = (enemy, grid, row, col) => {
  const targetShip = enemy.gameboard.findShip(row, col);
  if (targetShip.isSunk()) {
    targetShip.coords.forEach((coord) => {
      grid.childNodes.item(coord[0]).childNodes.item(coord[1]).classList.add('sunk');
    });
  }
};

const domUpdateBoard = (enemy, row, col) => {
  const grid = document.querySelector(enemy.grid);
  const target = grid.childNodes.item(row).childNodes.item(col);
  target.classList.add('attack');
  if (enemy.gameboard.cells[row][col] === 'X') {
    target.textContent = 'X';
    checkSunk(enemy, grid, row, col);
  } else {
    target.textContent = 'O';
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
  player.makeMove(opponent, row, col);
  if (!opponent.gameboard.isGameOver()) {
    opponent.makeMove(player, opponent);
  } else {
    gameover(opponent);
  }
  if (player.gameboard.isGameOver()) { gameover(player); }
};

const acceptMoves = (player, opponent) => {
  const grid = document.querySelector(opponent.grid);
  grid.childNodes.forEach((row, i) => {
    row.childNodes.forEach((col, j) => {
      col.addEventListener('click', () => {
        if (player.validAttack(opponent, i, j)) {
          playRound(player, opponent, i, j);
        }
      });
    });
  });
};

export {
  chooseDifficulty, getPlayerShips, acceptMoves, domNewShip, domUpdateBoard,
};
