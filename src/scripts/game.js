import newPlayer from './player';

const newGame = (difficulty) => {
  const human = newPlayer(false);
  let computer;
  let turn = 1;

  const addShipsToBoard = (player) => {
    const grid = (player === human) ? document.querySelector('.player-grid') : document.querySelector('.enemy-grid');
    player.gameboard.cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'O') { grid.childNodes.item(i).childNodes.item(j).textContent = 'O'; }
      });
    });
  };

  const setComputer = () => {
    computer = newPlayer(difficulty);
    computer.placeRandomShips();
    addShipsToBoard(computer);
  };

  const getPlayerShips = () => {
    human.gameboard.placeShip(0, 1, 1, 0);
    human.gameboard.placeShip(1, 3, 1, 0);
    human.gameboard.placeShip(2, 5, 1, 0);
    human.gameboard.placeShip(3, 7, 1, 0);
    human.gameboard.placeShip(4, 9, 1, 0);
    addShipsToBoard(human);
  };

  const startGame = () => {
    setComputer();
    getPlayerShips();
  };

  const getPlayerMove = () => {

  };

  const takeTurn = () => {
    if (turn % 2 !== 0) {
      const coords = getPlayerMove();
      human.makeMove(computer, coords[0], coords[1]);
    } else {
      computer.makeMove(human);
    }
    turn += turn;
  };

  const updateBoard = () => {

  };

  const play = () => {
    startGame();
    while (human.gameboard.isGameOver() && computer.gameboard.isGameOver()) {
      takeTurn();
      updateBoard();
    }
  };

  play();
};

export default newGame;
