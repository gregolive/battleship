import newPlayer from './player';

const newGame = () => {
  const human = newPlayer(false);
  let computer;
  let turn = 1;

  const setComputer = (difficulty) => {
    computer = newPlayer(difficulty);
    computer.placeRandomShips();
  };

  const takeTurn = (row, col) => {
    if (turn % 2 !== 0) {
      human.makeMove(computer, row, col);
    } else {
      computer.makeMove(human);
    }
    turn += turn;
  };

  const addDummyShips = () => {
    human.gameboard.placeShip(0, 1, 1, 0);
    human.gameboard.placeShip(1, 3, 1, 0);
    human.gameboard.placeShip(2, 5, 1, 0);
    human.gameboard.placeShip(3, 7, 1, 0);
    human.gameboard.placeShip(4, 9, 1, 0);
  };

  // Start new game
  const start = (difficulty) => {
    setComputer(difficulty);
    addDummyShips();
  };

  start();
};

export default newGame;
