import Player from '../scripts/player';

describe('when a player is created', () => {
  const humanPlayer = new Player(false);

  test('it should have no difficulty set if human', () => {
    expect(humanPlayer.difficulty).toBeFalsy();
  });

  test('it should have a gameboard set', () => {
    expect(humanPlayer.gameboard).toBeTruthy();
  });
});

describe('when a player attacks', () => {
  const player1 = new Player();
  const player2 = new Player();

  test('it should send the move to the opponent board', () => {
    player2.gameboard.placeShip(0, 0, 0, 0);
    player1.attack(player2, 0, 0);
    expect(player2.gameboard.cells[0][0]).toEqual('X');
  });
});
