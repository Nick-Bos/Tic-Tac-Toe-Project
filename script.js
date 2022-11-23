//player factorie function
const playerFactorie = (name, marker) => {
  return { name, marker };
};

//gameboard obj
const gameBoard = (() => {
  //create board array
  let board = [];
  for (i = 0; i < 9; i++) {
    board.push("");
  }
  // display square for each array item
  let squares = document.querySelector(".squares");

  board.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    squares.appendChild(square);
  });

  //event listener fop fields

  Array.from(squares.children).forEach((square, index) => {
    square.addEventListener("click", () => {
      //display player
      square.classList.add(game.player.marker);
      square.setAttribute("data", game.player.marker);
      //update array
      board[index] = game.player.marker;
      square.style.pointerEvents = "none";
      game.availableFields -= 1;
      game.winner();

      if (game.isAWinner == false) {
        if (game.availableFields > 0) {
          game.alertNextPlayer();
          game.nextPlayer();
        } else if (game.availableFields == 0) {
          game.tie();
        }
      }
    });
  });
  return { board };
})();

//game Obj

const game = (() => {
  const playerOne = playerFactorie("Player 1", "X");
  const playerTwo = playerFactorie("Player 2", "O");

  let player = playerOne;
  let isAWinner = false;
  let availableFields = 9;

  // message selectors

  let text = document.querySelector(".text");
  let playerName = document.querySelector(".player-name");

  //game win combonations
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // winner function

  function winner() {
    winCombos.forEach((item, index) => {
      if (
        gameBoard.board[item[0]] === this.player.marker &&
        gameBoard.board[item[1]] === this.player.marker &&
        gameBoard.board[item[2]] === this.player.marker
      ) {
        console.log("winner");
        text.innerHTML = `${this.player.name} Wins!`;
        this.isAWinner = true;
      }
    });
  }

  // alert next player
  function alertNextPlayer() {
    this.player === playerOne
      ? (playerName.textContent = "Player 2")
      : (playerName.textContent = "Player 1");
  }

  //next player
  function nextPlayer() {
    this.player === playerOne
      ? (this.player = playerTwo)
      : (this.player = playerOne);
  }

  //tie
  function tie() {
    text.innerHTML = "Tie";
  }

  return {
    player,
    availableFields,
    winner,
    alertNextPlayer,
    nextPlayer,
    tie,
    isAWinner,
  };
})();
