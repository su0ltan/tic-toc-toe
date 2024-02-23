import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Log from './components/Logs'

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver.jsx'


import { WINNING_COMBINATIONS } from './components/winning-combinations.js';


function derivedActivePlayer(gameTurn) {

  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],

];
function App() {

  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurn, setGameTurn] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);



  const activePlayer = derivedActivePlayer(gameTurn);


  let gameBoard = [...initialGameBoard.map(array => [...array])];


  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectedPlayed(row, col) {

    setGameTurn((prevTurn) => {

      const currentPlayer = derivedActivePlayer(prevTurn);


      const updateTurn = [{ square: { row: row, col: col }, player: currentPlayer },
      ...prevTurn,];


      return updateTurn;
    });


  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handlePlayerName(symbol, name) {
    setPlayers(prevPlayer => {
      return { ...prevPlayer, [symbol]: name };
    });
  }
  return (
    <main>


      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerName} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard onSelectedSequare={handleSelectedPlayed}
          board={gameBoard} />
        <Log turns={gameTurn} />
      </div>
    </main>
  )
}

export default App
