import gameboard from '../scripts/gameboard';

describe('when a board is created', () => {
  const myGameboard = gameboard();

  test('it should have empty cells', () => {
    myGameboard.cells.forEach((row) => {
      expect(row).toEqual(Array(10));
    });
  });

  test('it should have 5 ships', () => {
    expect(myGameboard.ships.length).toBe(5);
  });
});

describe('when a ship is placed on the board', () => {
  const myGameboard = gameboard();
  myGameboard.placeShip(0, 0, 0, 0);

  test('its cells should update', () => {
    expect(myGameboard.cells[0][0]).toEqual('O');
    expect(myGameboard.cells[0][4]).toEqual('O');
  });
});

describe('when an attack is made on the board', () => {
  const myGameboard = gameboard();
  myGameboard.placeShip(0, 0, 0, 0);

  test('it should record a missed attack', () => {
    myGameboard.receiveAttack(5, 5);
    expect(myGameboard.cells[5][5]).toBe('');
  });

  test('it should record a successful attack', () => {
    myGameboard.receiveAttack(0, 0);
    expect(myGameboard.cells[0][0]).toBe('X');
  });
});
