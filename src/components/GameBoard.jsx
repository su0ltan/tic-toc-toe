import { useState } from "react";


export default function GameBoard({ onSelectedSequare, board }) {

  



    return (
        <ol id="game-board">

            {board.map((row, indexRow) => (<li key={indexRow}>
                <ol>

                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button disabled={playerSymbol !== null} onClick={() => onSelectedSequare(indexRow, colIndex)}>
                        {playerSymbol}
                    </button></li>)}


                </ol>
            </li>))}
        </ol>

    );
}