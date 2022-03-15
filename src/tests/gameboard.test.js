import gameboard from '../scripts/gameboard';
import ship from '../scripts/ship';

describe('when board is created', () => {
  const myGameboard = gameboard();

  test('it should have 5 ships', () => {
    expect(myGameboard.ships.length).toBe(5);
  });

  test('it should have no missed attacks', () => {
    expect(myGameboard.missed.length).toBe(0);
  });
});

describe('when an attack is made', () => {
  const myGameboard = gameboard();
  const myShip = ship(5, 0, [0, 0]);
  myGameboard.placeShip(myShip);

  test('it should notify that the attack hit', () => {
    expect(myGameboard.receiveAttack([0, 0])).toBe(true);
  });

  test('it should notify that the attack missed', () => {
    expect(myGameboard.receiveAttack([5, 5])).toBe(false);
  });
});
