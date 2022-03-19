import Player from './player';

class Computer extends Player {
  constructor(difficulty) {
    super();
    this.difficulty = difficulty;
    this.grid = '.enemy-grid';

    this.getRandomInt = (max) => Math.floor(Math.random() * max);
  }

  placeRandomShips = (shipNo) => {
    let row = this.getRandomInt(10);
    let col = this.getRandomInt(10);
    const angle = String([0, 90][Math.floor(Math.random() * 2)]);
    while (this.checkShipPlacement(shipNo, row, col, angle) === false) {
      row = this.getRandomInt(10);
      col = this.getRandomInt(10);
    }
    this.placeNewShip(shipNo, row, col, angle);
  };

  getRandomAttack = (opponent) => {
    let row = this.getRandomInt(10);
    let col = this.getRandomInt(10);
    while (!this.validAttack(opponent, row, col)) {
      row = this.getRandomInt(10);
      col = this.getRandomInt(10);
    }
    return [row, col];
  };

  randomAttack = (opponent) => {
    const attacks = [];
    let row;
    let col;
    for (let i = 0; i < this.difficulty; i += 1) {
      [row, col] = this.getRandomAttack(opponent);
      this.attack(opponent, row, col);
      attacks.push([row, col]);
      if (opponent.gameboard.isGameOver()) { return attacks; }
    }
    return attacks;
  };
}

export default Computer;
