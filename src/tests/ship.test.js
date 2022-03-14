import ship from '../scripts/ship';

describe('when a ship is created', () => {
  const myShip = ship(5);

  test('its length can be read', () => {
    expect(myShip.length).toBe(5);
  });

  test('its positions are not hit', () => {
    expect(myShip.positions).toEqual(['O', 'O', 'O', 'O', 'O']);
  });
});

describe('when a ship is hit', () => {
  const myShip = ship(3);
  myShip.hit(1);

  test('its positions are updated with hit marker', () => {
    expect(myShip.positions).toEqual(['O', 'X', 'O']);
  });

  test('it does not sink when not all positions are hit', () => {
    expect(myShip.isSunk()).toBeFalsy();
  });

  test('it sinks when all positions are hit', () => {
    myShip.hit(0);
    myShip.hit(2);
    expect(myShip.isSunk()).toBeTruthy();
  });
});
