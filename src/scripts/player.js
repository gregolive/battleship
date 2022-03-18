import newGameboard from './gameboard';
import { getRandomInt } from './dom';

const newPlayer = (difficulty) => {
  const gameboard = newGameboard();

  const attack = (opponent, row, col) => opponent.gameboard.receiveAttack(row, col);

  const validAttack = (opponent, row, col) => {
    const target = opponent.gameboard.cells[row][col];
    if (target === 'X' || target === '') {
      return false;
    }
    return true;
  };

  const randomAttack = (opponent) => {
    let row = getRandomInt(10);
    let col = getRandomInt(10);
    while (!validAttack(opponent, row, col)) {
      row = getRandomInt(10);
      col = getRandomInt(10);
    }
    return [row, col];
  };

  const makeMove = (opponent, row, col) => {
    if (difficulty !== false) {
      const target = randomAttack(opponent);
      attack(opponent, target[0], target[1]);
      return target;
    }
    if (validAttack(opponent, row, col)) {
      attack(opponent, row, col);
      return true;
    }
    return false;
  };

  return {
    difficulty, gameboard, makeMove,
  };
};

export default newPlayer;
