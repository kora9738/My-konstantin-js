const TicTacToe = require('./tic-tac-toe');
const TicTacToeAI = require('./tic-tac-toe-ai');
const ttt = new TicTacToe();
const tttAI = new TicTacToeAI(ttt, 2);

ttt.registerListener(tttAI);

process.stdin.setEncoding('utf8');
const stdin = process.openStdin();

ttt.logGameState();
stdin.addListener('data', function(data) {
    ttt.act(parseInt(data, 10));
    ttt.logGameState();
    if(ttt.gameState != "open")
    {
        ttt.resetGame();
    }
});