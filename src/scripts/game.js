import newPlayer from './player';
import {
  chooseDifficulty, placeComputerShips, getPlayerShips, getPlayerMove,
} from './dom';

const playGame = async () => {
  const difficulty = await chooseDifficulty();
  const human = newPlayer(false);
  const computer = newPlayer(difficulty);
  let turn = 1;

  placeComputerShips(computer);
  getPlayerShips(human);

  const takeTurn = async () => {
    if (turn % 2 !== 0) {
      const coords = await getPlayerMove(human, computer);
      human.makeMove(computer, coords[0], coords[1]);
    } else {
      computer.makeMove(human);
    }
    turn += turn;
  };

  while (human.gameboard.isGameOver() && computer.gameboard.isGameOver()) {
    takeTurn();
  }
};

export default playGame;
