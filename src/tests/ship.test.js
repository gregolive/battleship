import ship from '../scripts/ship';

describe('ship public properties can be read', () => {
  let myShip;

  beforeEach(() => {
    myShip = ship(5);
  });

  test('length', () => {
    expect(myShip.length).toBe(5);
  });

  test('sunk', () => {
    expect(myShip.sunk).toBeFalsy();
  });

  test('hits', () => {
    expect(myShip.hits).toEqual([]);
  });
});
