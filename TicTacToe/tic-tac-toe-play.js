const TicTacToe = require('./tic-tac-toe');
const TicTacToeAI = require('./tic-tac-toe-ai');
const ttt = new TicTacToe();
const tttAI = new TicTacToeAI(ttt, 2);

class TicTacToePrinter
{
    actionTaken(){
        ttt.logGameState();
    }

    updateCurrentPlayer(player) {}
}

tttAI.waitTime = 100;
ttt.registerListener(tttAI);
ttt.registerListener(new TicTacToePrinter());

process.stdin.setEncoding('utf8');
const stdin = process.openStdin();


ttt.logGameState();
stdin.addListener('data', function(data) {
    ttt.act(parseInt(data, 10));
    if(ttt.gameState != "open")
    {
        ttt.logGameState();
        ttt.resetGame();
    }
});

