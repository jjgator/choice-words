import React from 'react';
import Letter from '../Letter/Letter.jsx';

const Letters = (props) => {
  return (
    <div>{props.gameLetters.map((letter, i) => {
      return <Letter letter={letter} key={i}/>
    })}</div>
  )
}

export default Letters;