import newGameboard from './gameboard';

const newPlayer = (difficulty) => {
  const gameboard = newGameboard();

  const attack = (opponent, row, col) => opponent.gameboard.receiveAttack(row, col);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const randomAttack = (opponent) => {
    let row = getRandomInt(10);
    let col = getRandomInt(10);
    while (opponent.gameboard.cells[row][col] === ('X' || '')) {
      row = getRandomInt(10);
      col = getRandomInt(10);
    }
    attack(opponent, row, col);
  };

  const makeMove = (opponent, row, col) => {
    if (typeof row === 'undefined') {
      for (let i = 0; i < difficulty; i += 1) { randomAttack(opponent); }
    } else {
      attack(opponent, row, col);
    }
  };

  const checkPlacement = (i, row, col, angle) => {
    const shipLength = gameboard.ships[i].length;
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
      if (testRow > 9 || testCol > 9 || typeof gameboard.cells[testRow][testCol] !== 'undefined') { return false; }
    }
    return true;
  };

  const placeRandomShips = () => {
    for (let i = 0; i < 5; i += 1) {
      let row = getRandomInt(10);
      let col = getRandomInt(10);
      const angle = [0, 90][Math.floor(Math.random() * 2)];
      while (checkPlacement(i, row, col, angle) === false) {
        row = getRandomInt(10);
        col = getRandomInt(10);
      }
      gameboard.placeShip(i, row, col, angle);
    }
  };

  return {
    difficulty, gameboard, makeMove, placeRandomShips,
  };
};

export default newPlayer;
