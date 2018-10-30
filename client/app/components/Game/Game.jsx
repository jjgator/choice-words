import React from 'react';
import Button from '../Button/Button.jsx';
import Letters from '../Letters/Letters.jsx';
import Player from '../Player/Player.jsx';

const Game = (props) => {
  return (
    <div>
      <div className="game-header">
        {props.gameStarted === false 
          ? <Button 
              buttonText="Start Game"
              onClick={props.startGame}
              // start game button disabled until player two joins
              disabled={props.playerTwo.username}
            />
          : <Letters gameLetters={props.gameLetters}/>
        }
      </div>
      <div className="players-wrapper">
        <Player 
          player="playerOne"
          wordSubmit={props.wordSubmit} 
          errorMsg={props.playerOne.errorMsg}
          submittedWords={props.playerOne.submittedWords}
          username={props.playerOne.username}
          gameStarted={props.gameStarted}
          gameEnded={props.gameEnded}
          inputVal={props.playerOne.inputVal}
          handleChange={props.handleWordInputChange}
          hideInput={props.activePlayer === "playerTwo" ? true : false}
        />
        <Player 
          player="playerTwo"
          wordSubmit={props.wordSubmit} 
          errorMsg={props.playerTwo.errorMsg}
          submittedWords={props.playerTwo.submittedWords}
          username={props.playerTwo.username}
          gameStarted={props.gameStarted}
          gameEnded={props.gameEnded}
          gameID={props.gameID}
          inputVal={props.playerTwo.inputVal}
          handleChange={props.handleWordInputChange}
          hideInput={props.activePlayer === "playerOne" ? true : false}
        />
      </div>
    </div>
  )
}

export default Game;