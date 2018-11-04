import React from 'react';
import Button from '../Button/Button.jsx';
import Letters from '../Letters/Letters.jsx';
import Player from '../Player/Player.jsx';

const Game = (props) => {
  return (
    <div className="game-wrapper">
      <h4>Choice Words</h4>
      <div className="border"></div>
      {props.gameStarted === false 
        ? <Button 
            type="start-game-button"
            buttonText="Start Game"
            onClick={props.startGame}
            // start game button disabled until player two joins
            // TODO: changed disabled value to {props.playerTwo.username} after dev
            disabled={false}
          />
        : <Letters gameLetters={props.gameLetters}/>
      }
      <div className="players-wrapper">
        <Player 
          player="playerOne"
          wordSubmit={props.wordSubmit} 
          errorMsg={props.playerOne.errorMsg}
          submittedWords={props.playerOne.submittedWords}
          username={props.playerOne.username}
          score={props.playerOne.score}
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
          score={props.playerTwo.score}
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