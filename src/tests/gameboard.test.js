import gameboard from '../scripts/gameboard';
import ship from '../scripts/ship';

describe('when board is created', () => {
  const myGameboard = gameboard();

  test('it should be a 10 x 10 board', () => {
    expect(myGameboard.cells.length).toBe(10);
    expect(myGameboard.cells[0].length).toBe(10);
  });

  test('it should place new ships on the board', () => {
    const myShip = ship(5, 90, [0, 0]);
    myGameboard.placeShip(myShip);
    expect(myGameboard.cells[0][0]).toBe('O');
    expect(myGameboard.cells[0][4]).toBe('O');
  });
});
/*
describe('when an attack is made', () => {
  const myGameboard = gameboard();

  test('it should notify that the attack hit', () => {
    expect(myGameboard.evaluateAttack(true)).toBe('Hit');
  });

  test('it should notify that the attack missed', () => {
    expect(myGameboard.evaluateAttack(false)).toBe('Miss');
  });
});
*/
