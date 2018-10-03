import React from 'react';
import Button from '../Button/Button.jsx';
import Letters from '../Letters/Letters.jsx';
import Player from '../Player/Player.jsx';

// todo: switch gameStarted components after testing complete

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
        <Player 
          wordSubmit={props.wordSubmit} 
          errorMsg={props.errorMsg}
          submittedWords={props.submittedWords}
          username={props.playerOne}
        />
        <Player 
          wordSubmit={props.wordSubmit} 
          errorMsg={props.errorMsg}
          submittedWords={props.submittedWords}
          username={props.playerTwo}
        />
      </div>
    </div>
  )
}

export default Game;