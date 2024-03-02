import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_PLAYER_NAMES = {
  X: "Player1",
  O: "Player2",
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}
function deriveWinner(gameBoard, playerNames){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerNames[firstSymbol];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (const { square, player } of gameTurns) {
    gameBoard[square.row][square.col] = player;
  }
  return gameBoard;
}
function App() {
  const [playerNames, setPlayerNames] = useState(INITIAL_PLAYER_NAMES);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  let hasDraw = false;
  if (!winner && gameTurns.length === 9) {
    hasDraw = true;
  }
  function selectSquareHandler(rowIndex, colIndex) {
    setGameTurns((currentTurns) => {
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: deriveActivePlayer(currentTurns),
        },
        ...currentTurns,
      ];
      return updatedTurns;
    });
  }
  function rematchHandler() {
    setGameTurns([]);
  }
  function playerNameChangeHandler(symbol, playerName) {
    setPlayerNames((currentNames) => ({
      ...currentNames,
      [symbol]: playerName,
    }));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={INITIAL_PLAYER_NAMES.X}
            symbol="X"
            isActivePlayer={activePlayer === "X"}
            playerNameChangeHandler={playerNameChangeHandler}
          />
          <Player
            initialName={INITIAL_PLAYER_NAMES.O}
            symbol="O"
            isActivePlayer={activePlayer === "O"}
            playerNameChangeHandler={playerNameChangeHandler}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematchHandler={rematchHandler} />
        )}
        <GameBoard
          selectSquareHandler={selectSquareHandler}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
