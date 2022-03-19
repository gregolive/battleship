import newShip from '../scripts/ship';

describe('when a ship is created/placed', () => {
  const myShip = newShip('Boaty', 5);
  myShip.placeOnBoard(0, 0, '90');

  test('its name should be properly set', () => {
    expect(myShip.name).toEqual('Boaty');
  });

  test('its length is properly set', () => {
    expect(myShip.length).toEqual(5);
  });

  test('its pieces have not been hit yet', () => {
    expect(myShip.pieces).toEqual(['O', 'O', 'O', 'O', 'O']);
  });

  test('its coordinates are properly set', () => {
    expect(myShip.coords).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
  });
});

describe('when a ship is hit', () => {
  const myShip = newShip('Boaty', 3);
  myShip.placeOnBoard(0, 0, '0');
  myShip.hit(1);

  test('its positions are updated with hit marker', () => {
    expect(myShip.pieces).toEqual(['O', 'X', 'O']);
  });

  test('it does not sink if not all positions are hit', () => {
    expect(myShip.isSunk()).toBeFalsy();
  });

  test('it sinks if all positions are hit', () => {
    myShip.hit(0);
    myShip.hit(2);
    expect(myShip.isSunk()).toBeTruthy();
  });
});
