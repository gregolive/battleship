import { addBoard, addRotateBtn } from './components';

// Dialog box

const changeAngle = () => {
  const angle = document.querySelector('.angle');
  angle.textContent = (angle.textContent === '0') ? '90' : '0';
};

const updateDialogBox = (text, angle = false) => {
  document.querySelector('.dialog-box').firstChild.textContent = text;
  if (angle === true && !document.querySelector('.rotate-btn')) {
    addRotateBtn();
    document.querySelector('.rotate-btn').addEventListener('click', changeAngle);
  } else if (angle === false && document.querySelector('.rotate-btn')) {
    document.querySelector('.rotate-btn').remove();
  }
};

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

const domNewShip = (player, shipNo) => {
  const pieceCoords = player.gameboard.ships[shipNo].coords;
  const domGrid = document.querySelector(player.grid);
  pieceCoords.forEach((coord) => {
    domGrid.childNodes.item(coord[0]).childNodes.item(coord[1]).classList.add('ship');
  });
};

const placeComputerShips = (computer) => {
  for (let i = 0; i < 5; i += 1) {
    computer.placeRandomShips(i);
    domNewShip(computer, i);
  }
};

const finalizePlayerBoard = () => {
  const board = document.querySelector('.player-board');
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

const placePlayerShip = async (player) => {
  const grid = document.querySelector(player.grid);
  let shipNo = 0;
  updateDialogBox(`Place your ${player.gameboard.ships[shipNo].name}.`, true);

  return new Promise((resolve) => {
    grid.childNodes.forEach((row, i) => {
      row.childNodes.forEach((col, j) => {
        col.addEventListener('click', () => {
          const angle = document.querySelector('.angle').textContent;
          if (player.checkShipPlacement(shipNo, i, j, angle)) {
            player.gameboard.placeShip(shipNo, i, j, angle);
            domNewShip(player, shipNo);
            shipNo += 1;
            if (shipNo <= 4) { updateDialogBox(`Place your ${player.gameboard.ships[shipNo].name}.`, true); }
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
  player.attack(opponent, row, col);
  domUpdateBoard(opponent, row, col);
  if (!opponent.gameboard.isGameOver()) {
    const computerMoves = opponent.randomAttack(player);
    computerMoves.forEach((m) => domUpdateBoard(player, m[0], m[1]));
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
  chooseDifficulty, placeComputerShips, getPlayerShips, acceptMoves,
};
