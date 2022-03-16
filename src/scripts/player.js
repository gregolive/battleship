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

  return {
    difficulty, gameboard, makeMove,
  };
};

export default newPlayer;
