import Player from '../scripts/player';
import Computer from '../scripts/computer';

describe('when a computer player is created', () => {
  const computerPlayer = new Computer(2);

  test('it should have a difficulty set', () => {
    expect(computerPlayer.difficulty).toBe(2);
  });
});

describe('when a computer player makes a move', () => {
  const player1 = new Player();
  const player2 = new Computer(2);

  test('it should be able to generate a random attacks', () => {
    const moves = player2.getRandomAttack(player1);
    moves.forEach((move) => {
      expect(move).toBeGreaterThanOrEqual(0);
      expect(move).toBeLessThan(10);
    });
  });

  test('it should attack multiple times relative to difficulty level', () => {
    let count = 0;
    player2.randomAttack(player1);
    player1.gameboard.cells.forEach((r) => r.forEach((c) => { if (c === '') { count += 1; } }));
    expect(count).toEqual(player2.difficulty);
  });
});
