import { addBoard, addRotateBtn, addPlayAgainBtn } from './components';

// Dialog box

const changeAngle = () => {
  const angle = document.querySelector('.angle');
  angle.textContent = (angle.textContent === '0') ? '90' : '0';
};

const updateDialogBox = (text, angle = false) => {
  document.querySelector('.dialog-box').firstChild.textContent = text;
  if (angle === true && !document.querySelector('.box-span')) {
    addRotateBtn();
    document.querySelector('.box-span').addEventListener('click', changeAngle);
  } else if (angle === false && document.querySelector('.box-span')) {
    document.querySelector('.box-span').remove();
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

const calcHoverShip = (length, grid, row, col, rowNum, colNum) => {
  const elements = [col];
  const angle = document.querySelector('.angle').textContent;
  if (angle === '0') {
    for (let i = 1; i < length; i += 1) {
      if (colNum + i < 10) { elements.push(row.childNodes[colNum + i]); }
    }
  } else {
    for (let i = 1; i < length; i += 1) {
      if (rowNum + i < 10) { elements.push(grid.childNodes[rowNum + i].childNodes[colNum]); }
    }
  }
  return elements;
};

const enableGridHover = (grid, shipLength) => {
  grid.childNodes.forEach((row, i) => {
    row.childNodes.forEach((col, j) => {
      col.addEventListener('mouseover', () => {
        const elements = calcHoverShip(shipLength, grid, row, col, i, j);
        elements.forEach((el) => {
          el.classList.add('hover');
        });
      });
      col.addEventListener('mouseleave', () => {
        const elements = calcHoverShip(shipLength, grid, row, col, i, j);
        elements.forEach((el) => {
          el.classList.remove('hover');
        });
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

const resetPlayerBoard = () => {
  const board = document.querySelector('.player-board');
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

const placePlayerShip = async (player, shipNo) => {
  const grid = document.querySelector(player.grid);
  const ship = player.gameboard.ships[shipNo];

  updateDialogBox(`Place your ${ship.name}.`, true);
  enableGridHover(grid, ship.length);

  return new Promise((resolve) => {
    grid.childNodes.forEach((row, i) => {
      row.childNodes.forEach((col, j) => {
        col.addEventListener('click', () => {
          const angle = document.querySelector('.angle').textContent;
          if (player.checkShipPlacement(shipNo, i, j, angle)) {
            player.gameboard.placeShip(shipNo, i, j, angle);
            domNewShip(player, shipNo);
            resetPlayerBoard();
            resolve();
          }
        });
      });
    });
  });
};

const addEnemyHover = () => {
  const enemyGrid = document.querySelector('.enemy-grid');
  Array.from(enemyGrid.querySelectorAll('.col')).forEach((cell) => { cell.classList.add('hover'); });
};

const startGame = () => {
  updateDialogBox('Your move first. Click to fire a shot!');
  addEnemyHover();
};

const getPlayerShips = async (player) => {
  await placePlayerShip(player, 0);
  await placePlayerShip(player, 1);
  await placePlayerShip(player, 2);
  await placePlayerShip(player, 3);
  await placePlayerShip(player, 4);
  startGame();
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
    if (!cell.classList.contains('sunk')) {
      cell.classList.add('living-ship');
    }
  });
};

const gameover = (player) => {
  rejectMoves();
  if (typeof player.difficulty !== 'undefined') {
    updateDialogBox('Game over. You win!');
  } else {
    revealComputerShips();
    updateDialogBox('Game over. Computer wins!');
  }
  addPlayAgainBtn();
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
