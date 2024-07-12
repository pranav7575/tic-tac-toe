import { useState } from 'react';
import './App.css';
import Block from './components/Block.jsx';

function App() {
   const [state, setState] = useState(Array(9).fill(null));
   const [currentTurn, setCurrentTurn] = useState("X");
   const [winner, setWinner] = useState(null);

   const checkWinner = (board) => {
      const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
      ];
      for (let i = 0; i < win.length; i++) {
         const [a, b, c] = win[i];
         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
         }
      }
      return null;
   };

   const handleBlockClick = (index) => {
      if (state[index] || winner) return; // If the block is already filled or there's a winner, do nothing

      const newState = [...state]; // Create a new copy of the state
      newState[index] = currentTurn;

      // Check if someone won
      const newWinner = checkWinner(newState);
      if (newWinner) {
         setWinner(newWinner);
      } else if (!newState.includes(null)) {
         setWinner('Draw');
      } else {
         setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
      }

      setState(newState);
   }

   return (
      <div className="board">
         {winner ? (
            <div className="winner">
               {winner === 'Draw' ? "It's a draw!" : `${winner} wins!`}
            </div>
         ) : (
            <div className="turn">Current turn: {currentTurn}</div>
         )}
         <div className='row'>
            <Block onClick={() => handleBlockClick(0)} value={state[0]}/>
            <Block onClick={() => handleBlockClick(1)} value={state[1]}/>
            <Block onClick={() => handleBlockClick(2)} value={state[2]}/>
         </div>
         <div className='row'>
            <Block onClick={() => handleBlockClick(3)} value={state[3]}/>
            <Block onClick={() => handleBlockClick(4)} value={state[4]}/>
            <Block onClick={() => handleBlockClick(5)} value={state[5]}/>
         </div>
         <div className='row'>
            <Block onClick={() => handleBlockClick(6)} value={state[6]}/>
            <Block onClick={() => handleBlockClick(7)} value={state[7]}/>
            <Block onClick={() => handleBlockClick(8)} value={state[8]}/>
         </div>
      </div>
   );
}

export default App;