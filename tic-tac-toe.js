class TicTacToe {
  constructor() {
    this.field = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentPlayer = 1;
    this.gameState = "open";
    this.listeners = [];
  }

  act(selection) {
    if (selection < 0 || selection >= this.field.length) {
      throw "Invalid field index " + selection;
    }

    if (this.gameState !== "open" || this.field[selection] !== 0) {
      return false;
    }

    this.field[selection] = this.currentPlayer;

    this.evaluateGameState();
    this.changePlayer();


    this.callListeners((listener) => listener.actionTaken());

    return true;
  }

  evaluateGameState() {
    if (!this.hasCurrentPlayerWon()) {
      this.checkForDraw();
    } else {
      if (this.currentPlayer == 1) {
        this.gameState = "player1won";
      } else {
        this.gameState = "player2won";
      }
    }
  }

  hasCurrentPlayerWon() {
    var won = false;
    for (let i = 0; i < 3; i++) {
      won |= this.checkRow(i);
      won |= this.checkColumn(i);
    }
    won |= this.checkDiagonals();
    return won;
  }

  checkDiagonals() {
    if (this.field[4] !== this.currentPlayer) {
      return false;
    }
    return (
      (this.field[0] == this.currentPlayer &&
        this.field[8] == this.currentPlayer) ||
      (this.field[2] == this.currentPlayer &&
        this.field[6] == this.currentPlayer)
    );
  }

  checkColumn(column) {
    for (let i = column; i < this.field.length; i += 3) {
      if (this.field[i] !== this.currentPlayer) {
        return false;
      }
    }
    return true;
  }

  checkRow(row) {
    for (let i = row * 3; i < row * 3 + 3; i++) {
      if (this.field[i] !== this.currentPlayer) {
        return false;
      }
    }
    return true;
  }

  checkForDraw() {
    var possibleMoves = this.field.reduce((acc, val) => {
      if (val == 0) {
        return ++acc;
      }
      return acc;
    }, 0);
    if (possibleMoves == 0) {
      this.gameState = "draw";
    }
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer + 1;
    if (this.currentPlayer > 2) {
      this.currentPlayer = 1;
    }

    this.callListeners((listener) => this.updatePlayer(listener));
  }

  updatePlayer(listener)
  {
    listener.updateCurrentPlayer(this.currentPlayer);
  }

  callListeners(func)
  {
    setTimeout(() => {
        this.listeners.forEach(listener => {
          func(listener);
        });
      }, 0);
  }

  resetGame() {
    this.field = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentPlayer = 1;
    this.gameState = "open";

    this.callListeners((listener) => listener.actionTaken());
    this.callListeners((listener) => this.updatePlayer(listener));
  }

  registerListener(listener) {
    this.listeners.push(listener);
  }

  logGameState() {
    var string = "";
    if (this.gameState != "open") {
      string = this.gameState + "\n";
    } else {
      string = "Player" + this.currentPlayer + "'s turn:\n\n";
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        string = string.concat(this.field[i * 3 + j]).concat("   ");
      }
      string = string.concat("\n");
    }
    console.log(string);
  }
}


try {
  module.exports = TicTacToe;
} catch (error) {
  console.log(error);
}
