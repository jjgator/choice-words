import React from 'react';
import Button from '../Button/Button.jsx';
import Letters from '../Letters/Letters.jsx';
import Player from '../Player/Player.jsx';

const Game = (props) => {
  return (
    <div>
      <div className="game-header">
        {props.gameStarted === false ?
          <Letters gameLetters={props.gameLetters}/>
          : 
          <Button buttonText="Start Game"/>
        }
      </div>
      <div className="players-wrapper">
        <Player wordSubmit={props.wordSubmit} />
        <Player wordSubmit={props.wordSubmit} />
      </div>
    </div>
  )
}

export default Game;