class TicTacToeAI{
  constructor(ttt, player, active) {
    this.ttt = ttt;
    this.player = player;
    this.waitTime = 0;

    if (active == undefined) {
      this.active = true;
    } else {
      this.active = active;
    }
  }

  actionTaken (){}

  updateCurrentPlayer(currentPlayer) {
    if (this.player == currentPlayer) {
      setTimeout(() => {
        this.doTurn();
      }, this.waitTime);
    }
  }

  doTurn() {
    if (!this.active) {
      return;
    }
    if (this.ttt.field[4] == 0) {
      this.ttt.act(4);
      return;
    }

    if (this.reactiveTurn(this.player)) {
      return;
    }

    if (this.reactiveTurn(this.player == 1 ? 2 : 1)) {
      return;
    }

    if (this.takeCorner()) {
      return;
    }

    for (let i = 0; i < this.ttt.field.length; i++) {
      if (this.takeFieldIfEmpty(i)) {
        return;
      }
    }
  }

  reactiveTurn(player) {
    for (let i = 0; i < 3; i++) {
      var field = this.winOnNextTurn(i * 3, 1, player);
      if (field != -1) {
        this.ttt.act(field);
        return true;
      }

      field = this.winOnNextTurn(i, 3, player);
      if (field != -1) {
        this.ttt.act(field);
        return true;
      }
    }

    var field = this.winOnNextTurn(0, 4, player);
    if (field != -1) {
      this.ttt.act(field);
      return true;
    }
    field = this.winOnNextTurn(2, 2, player);
    if (field != -1) {
      this.ttt.act(field);
      return true;
    }

    return false;
  }

  winOnNextTurn(start, step, player) {
    var inLine = 0;
    var lastField = -1;
    for (let i = 0; i < 3; i++) {
      var index = start + i * step;
      if (this.ttt.field[index] == player) {
        inLine++;
      } else if (
        this.ttt.field[index] !== player &&
        this.ttt.field[index] !== 0
      ) {
        return -1;
      } else {
        lastField = index;
      }
    }

    return inLine == 2 ? lastField : -1;
  }

  takeCorner() {
    if (this.takeFieldIfEmpty(0)) {
      return true;
    }

    if (this.takeFieldIfEmpty(2)) {
      return true;
    }

    if (this.takeFieldIfEmpty(6)) {
      return true;
    }

    if (this.takeFieldIfEmpty(8)) {
      return true;
    }

    return false;
  }

  takeFieldIfEmpty(i) {
    if (this.ttt.field[i] == 0) {
      this.ttt.act(i);
      return true;
    }
    return false;
  }

  setActive(active) {
    this.active = active;
  }
}

try {
  module.exports = TicTacToeAI;
} catch (error) {
  console.log(error);
}
