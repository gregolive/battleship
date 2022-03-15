import ship from './ship';

const gameboard = () => {
  // const cells = Array.from(Array(10), () => new Array(10));
  const ships = [
    ship('Aircraft Carrier', 5),
    ship('Battleship', 4),
    ship('Cruiser', 3),
    ship('Submarine', 3),
    ship('Destroyer', 2),
  ];
  const missed = [];

  /*
  const updateCells = (x, y, icon) => {
    cells[x][y] = icon;
  };

  const placeShip = (ship) => {
    const coords = ship.calcCoords();
    coords.forEach((c) => { updateCells(c[0], c[1], 'O'); });
  };
  */

  const receiveAttack = (x, y) => {
    
  };

  return { ships, missed, receiveAttack };
};

export default gameboard;
