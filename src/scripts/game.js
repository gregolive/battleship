import newPlayer from './player';
import {
  chooseDifficulty, placeComputerShips, getPlayerShips, acceptMoves,
} from './dom';

const playGame = async () => {
  const difficulty = await chooseDifficulty();
  const human = newPlayer(false);
  const computer = newPlayer(difficulty);

  placeComputerShips(computer);
  getPlayerShips(human);
  acceptMoves(human, computer);
};

export default playGame;
