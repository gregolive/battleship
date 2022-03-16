import newShip from './ship';

const newGameboard = () => {
  const cells = Array.from(Array(10), () => new Array(10));
  const ships = [
    newShip('Aircraft Carrier', 5),
    newShip('Battleship', 4),
    newShip('Cruiser', 3),
    newShip('Submarine', 3),
    newShip('Destroyer', 2),
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

  const findPiece = (ship, row, col) => {
    let piece;
    for (let i = 0; i < ship.coords.length; i += 1) {
      if (JSON.stringify(ship.coords[i]) === JSON.stringify([row, col])) { piece = i; }
    }
    return piece;
  };

  const receiveAttack = (row, col) => {
    if (cells[row][col] === 'O') {
      const ship = findShip(row, col);
      const piece = findPiece(ship, row, col);
      ship.hit(piece);
      updateCells(row, col, 'X');
    } else {
      updateCells(row, col, '');
    }
  };

  const isGameOver = () => ships.every((ship) => ship.isSunk());

  return {
    cells, ships, placeShip, receiveAttack, isGameOver,
  };
};

export default newGameboard;
