import ship from './ship';

const gameboard = () => {
  const cells = Array.from(Array(10), () => new Array(10));
  const ships = [
    ship('Aircraft Carrier', 5),
    ship('Battleship', 4),
    ship('Cruiser', 3),
    ship('Submarine', 3),
    ship('Destroyer', 2),
  ];

  const updateCells = (row, col, icon) => { cells[row][col] = icon; };

  const placeShip = (index, row, col, angle) => {
    const targetShip = ships[index];
    targetShip.placeOnBoard(row, col, angle);
    targetShip.coords.forEach((c, i) => { updateCells(c[0], c[1], targetShip.pieces[i]); });
  };

  const findShip = (row, col) => {
    const target = ships.find((s) => JSON.stringify(s.coords).includes(JSON.stringify([row, col])));
    return target;
  };

  const receiveAttack = (row, col) => {
    if (cells[row][col] === 'O') {
      const target = findShip(row, col);
      target.hit(target.coords.indexOf([row, col]));
      updateCells(row, col, 'X');
    } else {
      updateCells(row, col, '');
    }
  };

  return {
    cells, ships, placeShip, receiveAttack,
  };
};

export default gameboard;
