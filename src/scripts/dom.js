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

const updateBoard = () => {

};

const getPlayerMove = async (player, opponent) => {
  const grid = document.querySelector('.enemy-grid');

  return new Promise((resolve) => {
    grid.childNodes.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col.textContent === '') {
          col.addEventListener('click', () => {
            player.makeMove(opponent, i, j);
            updateBoard();
            resolve();
          });
        }
      });
    });
  });
};

export {
  chooseDifficulty, getRandomInt, placeComputerShips, getPlayerShips, getPlayerMove,
};
