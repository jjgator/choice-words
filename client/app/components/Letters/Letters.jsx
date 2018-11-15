import React from 'react';
import Letter from '../Letter/Letter.jsx';

const Letters = (props) => {
  return (
    <div className="letters">{props.gameLetters.map((letter, i) => {
      return <Letter 
        letter={letter} 
        key={i}
        gameStarted={props.gameStarted}
      />
    })}</div>
  )
}

export default Letters;