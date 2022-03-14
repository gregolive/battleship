import ship from '../scripts/ship';

describe('when a ship is created', () => {
  const myShip = ship(5, 90, [0, 0]);

  test('its length is set', () => {
    expect(myShip.length).toEqual(5);
  });

  test('its angle is set', () => {
    expect(myShip.angle).toEqual(90);
  });

  test('its starting coordinates are set', () => {
    expect(myShip.start).toEqual([0, 0]);
  });

  test('it has not been hit yet', () => {
    expect(myShip.positions).toEqual(['O', 'O', 'O', 'O', 'O']);
  });

  test('its coordinates are set properly', () => {
    expect(myShip.calcCoords()).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
  });
});

describe('when a ship is hit', () => {
  const myShip = ship(3, 0, [0, 0]);
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
