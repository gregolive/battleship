import Player from './player';
import Computer from './computer';
import {
  chooseDifficulty, placeComputerShips, getPlayerShips, acceptMoves,
} from './dom';

const playGame = async () => {
  const difficulty = await chooseDifficulty();
  const human = new Player();
  const computer = new Computer(difficulty);

  placeComputerShips(computer);
  await getPlayerShips(human);
  acceptMoves(human, computer);
};

export default playGame;
