import React from 'react';

const Letter = (props) => {
  return <span className={props.gameStarted === true ? "letter" : "letter hide"}>
    {props.letter}
  </span>
}

export default Letter;