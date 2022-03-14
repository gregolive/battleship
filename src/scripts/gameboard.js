const gameboard = () => {
  const cells = Array.from(Array(10), () => new Array(10));

  const updateCells = (x, y, icon) => {
    cells[x][y] = icon;
  };

  const placeShip = (ship) => {
    const coords = ship.calcCoords();
    coords.forEach((c) => { updateCells(c[0], c[1], 'O'); });
  };

  return { cells, placeShip };
};

export default gameboard;
