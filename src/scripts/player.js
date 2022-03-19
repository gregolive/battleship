import newGameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = newGameboard();
    this.grid = '.player-grid';

    this.attack = (opponent, row, col) => { opponent.gameboard.receiveAttack(row, col); };

    this.validAttack = (opponent, row, col) => {
      const target = opponent.gameboard.cells[row][col];
      if (target === 'X' || target === '') {
        return false;
      }
      return true;
    };
  }

  placeNewShip = (shipNo, row, col, angle) => this.gameboard.placeShip(shipNo, row, col, angle);

  checkShipPlacement = (shipNo, row, col, angle) => {
    const shipLength = this.gameboard.ships[shipNo].length;
    for (let j = 0; j < shipLength; j += 1) {
      let testRow;
      let testCol;
      if (angle === 0) {
        testRow = row;
        testCol = col + j;
      } else {
        testRow = row + j;
        testCol = col;
      }
      if (testRow > 9 || testCol > 9 || typeof this.gameboard.cells[testRow][testCol] !== 'undefined') { return false; }
    }
    return true;
  };
}

export default Player;
