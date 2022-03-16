import newPlayer from './player';

const newGame = () => {
  const human = newPlayer(false);
  let computer;
  let turn = 1;

  const setComputer = (difficulty) => { computer = newPlayer(difficulty); };

  const takeTurn = (row, col) => {
    if (turn % 2 !== 0) {
      human.makeMove(computer, row, col);
    } else {
      computer.makeMove(human);
    }
    turn += turn;
  };

  return {
    turn, human, computer, setComputer, takeTurn,
  };
};

export default newGame;
