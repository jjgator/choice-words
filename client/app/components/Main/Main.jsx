import React from 'react';
import Button from '../Button/Button.jsx';
import Game from '../Game/Game.jsx';
import firebase from '../../firebase.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      playerOne: null,
      playerTwo: null,
      gameStarted: false,
      gameLetters: [],
      errorMsg: '',
      submittedWords: [],
      gameID: null
    };
    this.startGame = this.startGame.bind(this);
    this.getGameLetters = this.getGameLetters.bind(this);
    this.getRandomIndex = this.getRandomIndex.bind(this);
    this.handleWordSubmit = this.handleWordSubmit.bind(this);
    this.isUnique = this.isUnique.bind(this);
    this.hasOnlyGivenChars = this.hasOnlyGivenChars.bind(this);
  }

  async startGame (e) {
    e.preventDefault();
    const user = e.target.username.value;

    // check for empty input
    if (user.length > 0) {
      // if no users are "logged in", user is the first player
      // refactor: check DB instead to see if first user is "logged in"
      if (this.state.playerOne === null) {
        const gamesRef = firebase.database().ref('games');
        const game = {
          playerOne: user
        }
        const newGame = await gamesRef.push(game);
        const gameID = newGame.key;
        this.setState({
          playerOne: user,
          gameLetters: this.getGameLetters(),
          gameID: gameID
        });
      // else if user is the second player
      // } else {
      //   // add second user to DB
      }
    } else {
      alert("You must enter a username to play the game.");
    }
  }

  // generates a new set of random, unique letters for each game
  getGameLetters () {
    const consonants = [
      'b','c','d','f','g','h','j','k','l',
      'm','n','p','q','r','s','t','v','w',
      'x','y','z'
    ];
    const vowels = ['a','e','i','o','u'];
    const gameLetters = [];

    while (gameLetters.length <= 6) {
      const i = this.getRandomIndex(consonants.length);
      if (!gameLetters.includes(consonants[i])) {
        gameLetters.push(consonants[i]);
      }
    }
    while (gameLetters.length <= 8) {
      const j = this.getRandomIndex(vowels.length);
      if (!gameLetters.includes(vowels[j])) {
        gameLetters.push(vowels[j]);
      }
    }
    
    return gameLetters;
  };

  handleWordSubmit (e) {
    e.preventDefault();
    const submittedWord = e.target.word.value.toLowerCase();

    const tooShortMsg = "Your word must contain at least two letters. Please try again."
    const wrongCharMsg = "You may only use the provided letters. Please try again."
    const notUniqueCharMsg = "You can use each letter only once. Please try again."
    const notUniqueWordMsg = "You've already submitted that word. Please try again."

    //check if string is empty or too short
    if (submittedWord.length <= 1) {
      this.setState({errorMsg: tooShortMsg});
    // check only given letters are used
    } else if (!this.hasOnlyGivenChars(submittedWord)) {
      this.setState({errorMsg: wrongCharMsg});
    // check that each letter is used only once
    } else if (!this.isUnique(submittedWord)) {
      this.setState({errorMsg: notUniqueCharMsg});
    // check to see if word was already submitted
    } else if (this.state.submittedWords.includes(submittedWord)) {
      this.setState({errorMsg: notUniqueWordMsg});
    // submit valid word
    } else {
      this.setState({
        submittedWords: [...this.state.submittedWords, submittedWord],
        errorMsg: ''
      });
    }
  }

  render () {
    console.log(this.props);
    return (
      this.state.playerOne === null 
      ? <div>
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
        </div>
      : <Game 
          gameStarted={this.state.gameStarted}
          gameLetters={this.state.gameLetters}
          wordSubmit={this.handleWordSubmit}
          errorMsg={this.state.errorMsg}
          submittedWords={this.state.submittedWords}
          playerOne={this.state.playerOne}
          playerTwo={this.state.playerTwo}
        />
    )
  }

  // helper function for getGameLetters,
  // generates random index for choosing game letters
  getRandomIndex (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // helper function for handleWordSubmit, 
  // checks for repeating letters
  isUnique (string) {
    return (string === [...new Set(string)].join(''));
  }

  // helper function for handleWordSubmit, 
  // ensures only characters in letterset are used
  hasOnlyGivenChars (string) {
    let result = true;

    for (let i = 0; i < string.length; i++) {
      if (!this.state.gameLetters.includes(string.charAt(i))) {
        result = false;
      }
    }

    return result;
  }
}

export default Main;