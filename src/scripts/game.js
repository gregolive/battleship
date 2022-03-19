import Player from './player';
import Computer from './computer';
import {
  chooseDifficulty, getPlayerShips, acceptMoves,
} from './dom';

const playGame = async () => {
  const difficulty = await chooseDifficulty();
  const human = new Player();
  const computer = new Computer(difficulty);

  computer.placeRandomShips();
  await getPlayerShips(human);
  acceptMoves(human, computer);
};

export default playGame;
