// game.js

const TicTacToe = require('./tic-tac-toe');
const ttt = new TicTacToe();

console.log(ttt.gameState); // "draw"

ttt.act(0); // Player 1
ttt.act(3); // Player 2
ttt.act(1); // Player 1
ttt.act(4); // Player 2
ttt.act(2); // Player 1

console.log(ttt.gameState); // "player1won"

ttt.resetGame();
console.log(ttt.gameState); // "open"
ttt.act(4); // Player 1