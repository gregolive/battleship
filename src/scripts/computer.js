import Player from './player';
import { domUpdateBoard } from './dom';

class Computer extends Player {
  constructor(difficulty) {
    super();
    this.difficulty = difficulty;
    this.grid = '.enemy-grid';

    this.getRandomInt = (max) => Math.floor(Math.random() * max);
  }

  placeRandomShips = () => {
    for (let i = 0; i < 5; i += 1) {
      let row = this.getRandomInt(10);
      let col = this.getRandomInt(10);
      const angle = [0, 90][Math.floor(Math.random() * 2)];
      while (this.checkShipPlacement(i, row, col, angle) === false) {
        row = this.getRandomInt(10);
        col = this.getRandomInt(10);
      }
      this.placeNewShip(i, row, col, angle);
    }
  };

  randomAttack = (opponent) => {
    let row = this.getRandomInt(10);
    let col = this.getRandomInt(10);
    while (!this.validAttack(opponent, row, col)) {
      row = this.getRandomInt(10);
      col = this.getRandomInt(10);
    }
    this.attack(opponent, row, col);
    domUpdateBoard(opponent, row, col);
  };

  makeMove = (opponent) => {
    for (let i = 0; i < this.difficulty; i += 1) {
      this.randomAttack(opponent);
      if (opponent.gameboard.isGameOver()) { return; }
    }
  };
}

export default Computer;
