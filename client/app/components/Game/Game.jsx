import React from 'react';
import Button from '../Button/Button.jsx';
import Letters from '../Letters/Letters.jsx';
import Player from '../Player/Player.jsx';

const Game = (props) => {
  return (
    <div>
      <div className="game-header">
        {props.gameStarted === false ?
          <Button buttonText="Start Game"/>
          : 
          <Letters gameLetters={props.gameLetters}/>
        }
      </div>
      <div className="players-wrapper">
        <Player />
        <Player />
      </div>
    </div>
  )
}

export default Game;