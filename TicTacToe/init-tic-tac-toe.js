const ttt = new TicTacToe();
const tttAI1 = new TicTacToeAI(ttt, 1, false);
const tttAI2 = new TicTacToeAI(ttt, 2, true);

class TicTacToeUiUpdater {
  actionTaken() {
    updateUi();
  }

  updateCurrentPlayer(player) {}
}

let prompt;
let fields;
let mode;
let waitTime;

function initTTT() {
  root = document.querySelector(".tic-tac-toe");
  prompt = document.querySelector(".prompt");
  fields = root.querySelector(".grid").children;

  var resetButton = root.querySelector(".reset");
  resetButton.addEventListener("click", function() {
    resetGame();
  });

  mode = root.querySelector(".mode");
  mode.addEventListener("change", function() {
    changeMode();
  });

  waitTime = root.querySelector(".waitTime");
  waitTime.addEventListener("change", function() {
    changeWaitTime();
  });
  waitTime.value = 500;
  changeWaitTime();
  changeMode();

  for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener("click", getHandleAction(i));
  }

  ttt.registerListener(new TicTacToeUiUpdater());
  ttt.registerListener(tttAI1);
  ttt.registerListener(tttAI2);

  updateUi();
}

function resetGame() {
  ttt.resetGame();
  for (let item of fields) {
    item.classList.remove("field--circle", "field--cross", "field--won");
  }
  updateUi();
}

function changeWaitTime() {
  let time = parseInt(waitTime.value, 10);
  tttAI1.waitTime = time;
  tttAI2.waitTime = time;
}

function changeMode() {
  switch (mode.selectedIndex) {
    case 0:
      tttAI1.active = false;
      tttAI2.active = false;
      break;
    case 1:
      tttAI1.active = false;
      tttAI2.active = true;
      break;
    case 2:
      tttAI1.active = true;
      tttAI2.active = false;
      break;
    case 3:
      tttAI1.active = true;
      tttAI2.active = true;
      break;
    default:
      tttAI1.active = false;
      tttAI2.active = false;
      break;
  }

  resetGame();
}

function getHandleAction(input) {
  return () => {
    handleAction(input);
  };
}

function handleAction(input) {
  let valid = ttt.act(input);
  if (valid) {
    updateUi();
  } else {
    alert("invalid turn!");
  }
}

function updateUi() {
  updatePrompt();
  updateField();
  highlightWinner();
}

function updatePrompt() {
  let promptText;
  switch (ttt.gameState) {
    case "open":
      promptText = "Player" + ttt.currentPlayer + "'s turn";
      break;
    case "draw":
      promptText = "Draw";
      break;
    case "player1won":
      promptText = "Player1 won";
      break;
    case "player2won":
      promptText = "Player2 won";
      break;
    default:
      promptText = "TicTacToe";
      break;
  }

  prompt.innerHTML = promptText;
}

function updateField() {
  for (let i = 0; i < ttt.field.length; i++) {
    if (ttt.field[i] != 0) {
      let type = ttt.field[i] == 1 ? "field--circle" : "field--cross";
      fields[i].classList.add(type);
    } else {
      fields[i].classList.remove("field--circle", "field--cross", "field--won");
    }
  }
}

function highlightWinner() {
  if (ttt.gameState != "player1won" && ttt.gameState != "player2won") {
    return;
  }

  for (let i = 0; i < 3; i++) {
    var winner = this.fullLine(i * 3, 1);
    if (winner) {
      highlight(i * 3, 1);
      return;
    }

    winner = this.fullLine(i, 3);
    if (winner) {
      highlight(i, 3);
      return;
    }
  }

  var winner = this.fullLine(0, 4);
  if (winner) {
    highlight(0, 4);
    return;
  }
  field = this.fullLine(2, 2);
  if (winner) {
    highlight(2, 2);
    return;
  }
}

function fullLine(start, step) {
  let player = -1;

  for (let i = 0; i < 3; i++) {
    var index = start + i * step;
    if (player == -1) {
      player = ttt.field[index];
    }
    if (ttt.field[index] == 0 || ttt.field[index] != player) {
      return false;
    }
  }
  return true;
}

function highlight(start, step) {
  setTimeout(() => {
    highlightWithTimeout(start, step);
  }, 100);
}

function highlightWithTimeout(start, step){
    for (let i = 0; i < 3; i++) {
        var index = start + i * step;
        fields[index].classList.add("field--won");
      }
}