import newPlayer from '../scripts/player';

describe('when a player is created', () => {
  const humanPlayer = newPlayer(false);
  const computerPlayer = newPlayer(2);

  test('it should have no difficulty set if human', () => {
    expect(humanPlayer.difficulty).toBeFalsy();
  });

  test('it should have a difficulty set if computer', () => {
    expect(computerPlayer.difficulty).toBe(2);
  });

  test('it should have a gameboard', () => {
    expect(computerPlayer.gameboard).toBeTruthy();
  });
});

describe('when a player makes a move', () => {
  const humanPlayer = newPlayer(false);
  const computerPlayer = newPlayer(2);

  test('it should send the move to the opponent board', () => {
    computerPlayer.gameboard.placeShip(0, 0, 0, 0);
    humanPlayer.makeMove(computerPlayer, 0, 0);
    expect(computerPlayer.gameboard.cells[0][0]).toEqual('X');
  });

  test('it should be random for a computer player', () => {
    computerPlayer.makeMove(humanPlayer);
    expect(humanPlayer.gameboard.cells.some((row) => row.includes(''))).toBeTruthy();
  });

  test('it should attack multiple times relative to difficulty level', () => {
    let count = 0;
    humanPlayer.gameboard.cells.forEach((r) => r.forEach((c) => { if (c === '') { count += 1; } }));
    expect(count).toEqual(computerPlayer.difficulty);
  });
});
