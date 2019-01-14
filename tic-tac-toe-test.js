const assert = require('assert');
const TicTacToe = require('./tic-tac-toe');

console.log('Testing TicTacToe...');

(function test_Creation() {
  assert.ok(new TicTacToe());
})();

(function test_getGameState_shouldInitiallyBeOpen() {
  assert.equal(new TicTacToe().gameState, 'open');
})();

(function test_currentPlayer_shouldInitiallyBePlayerOne() {
  assert.equal(new TicTacToe().currentPlayer, 1);
})();

(function test_act_shouldReturnTrueIfMoveIsValid() {
  const ttt = new TicTacToe();
  assert(ttt.act(0), 'act returned false');
})();

(function test_act_shouldRefreshGameState_player1Won() {
  const ttt = new TicTacToe();
  ttt.act(0); // Player 1
  ttt.act(3); // Player 2
  ttt.act(1); // Player 1
  ttt.act(4); // Player 2
  ttt.act(2); // Player 1
  assert.equal(ttt.gameState, 'player1won');
})();

(function test_fields_shouldChangeWhenPlayersAct() {
  const ttt = new TicTacToe();
  ttt.act(0); // Player 1
  ttt.act(1); // Player 2
  ttt.act(8); // Player 1
  assert.deepEqual(ttt.field, [1, 2, 0, 0, 0, 0, 0, 0, 1]);
})();

console.log('OK');