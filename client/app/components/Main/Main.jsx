import React from 'react';
import Button from '../Button/Button.jsx';
import Game from '../Game/Game.jsx';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firstUser: null,
      gameStarted: false,
      gameLetters: []
    };
    this.startGame = this.startGame.bind(this);
    this.getGameLetters = this.getGameLetters.bind(this);
    this.getRandomIndex = this.getRandomIndex.bind(this);
  }

  startGame (e) {
    e.preventDefault();
    this.setState(
      {
        firstUser: e.target.username.value,
        gameLetters: this.getGameLetters()
      }
    );
  }

  // helper function for getGameLetters
  getRandomIndex (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // generates a new set of random letters for each game
  getGameLetters () {
    const consonants = [
      'b','c','d','f','g','h','j','k','l',
      'm','n','p','q','r','s','t','v','w',
      'x','y','z'
    ];
    const vowels = ['a','e','i','o','u'];
    const gameLetters = [];

    while (gameLetters.length <=6) {
      const i = this.getRandomIndex(consonants.length);
      if (!gameLetters.includes(consonants[i])) {
        gameLetters.push(consonants[i]);
      }
    }
    while (gameLetters.length<=8) {
      const j = this.getRandomIndex(vowels.length);
      if (!gameLetters.includes(vowels[j])) {
        gameLetters.push(vowels[j]);
      }
    }
    
    return gameLetters;
  };

  render () {
    return (
      this.state.firstUser === null ? 
      <div>
        <form onSubmit={this.startGame}>
          <label>Enter your username:
            <input name="username">
            </input><br/>
          </label>
          <Button 
            type="start-game-button"
            buttonText="Start New Game"
         />
        </form>
      </div> :
      <Game 
        gameStarted={this.state.gameStarted}
        gameLetters={this.state.gameLetters}
      />
    )
  }
}

export default Main;