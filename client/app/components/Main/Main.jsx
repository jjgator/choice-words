import React from 'react';
import Button from '../Button/Button.jsx';
import Game from '../Game/Game.jsx';
import firebase from '../../firebase.js';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      gameID: null,
      loggedIn: false,
      gameLetters: [],
      inputVal: '',
      gameStarted: false,
      gameEnded: false,
      playerOne: {
        username: null,
        submittedWords: [],
        errorMsg: ''
      },
      playerTwo: {
        username: null,
        submittedWords: [],
        errorMsg: ''
      }
    };
    this.createOrJoinGame = this.createOrJoinGame.bind(this);
    this.getGameLetters = this.getGameLetters.bind(this);
    this.getRandomIndex = this.getRandomIndex.bind(this);
    this.handleWordSubmit = this.handleWordSubmit.bind(this);
    this.handleWordInputChange = this.handleWordInputChange.bind(this);
    this.isUnique = this.isUnique.bind(this);
    this.hasOnlyGivenChars = this.hasOnlyGivenChars.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  async componentDidMount () {
    let gameID = this.props.match.params.game_id || null;
    // if gameID does not exist, user must be first player
    if (gameID === null) {
      // create new game
      const gamesRef = firebase.database().ref('games');
      const game = {gameLetters: this.getGameLetters()};
      const createNewGame = await gamesRef.push(game);
      gameID = createNewGame.key;
      const newGameRef = firebase.database().ref(`/games/${gameID}`);

      this.setState({gameID: gameID});

      newGameRef.on('value', snapshot => {
        const newGame = snapshot.val();

        this.setState({
          playerOne: {...this.state.playerOne, username: newGame.playerOne || null},
          playerTwo: {...this.state.playerTwo, username: newGame.playerTwo || null},
          gameLetters: newGame.gameLetters,
          gameStarted: newGame.gameStarted || false,
          gameEnded: newGame.gameEnded || false
        });
      });
    // if gameID exists, user must be second player
    } else {
      // pull game data from db
      const currentGameRef = firebase.database().ref(`/games/${gameID}`);

      currentGameRef.on('value', snapshot => {
        const currentGame = snapshot.val();

        this.setState({
          playerOne: {...this.state.playerOne, username: currentGame.playerOne},
          playerTwo: {...this.state.playerTwo, username: currentGame.playerTwo || null},
          gameLetters: currentGame.gameLetters,
          gameID: gameID,
          gameStarted: currentGame.gameStarted || false,
          gameEnded: currentGame.gameEnded || false
        });
      });
    }
  }

  createOrJoinGame (e) {
    e.preventDefault();
    const user = e.target.username.value;
    const gameID = this.state.gameID;
    const gameRef = firebase.database().ref(`/games/${gameID}`);
    // check for empty input
    if (user.length > 0) {
      firebase.database().ref(`/games/${gameID}/playerOne`).once('value', snapshot => {
        // if player one already exists
        if (snapshot.exists()) {
          gameRef.update({
            playerTwo: user
          });
          this.setState({loggedIn: true});
        // else if player one does not exist
        } else {
          gameRef.update({
            playerOne: user
          });
          this.setState({
            loggedIn: true,
          });
        }
      });
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

  startGame () {
    const gameID = this.state.gameID;
    const gameRef = firebase.database().ref(`/games/${gameID}`);
    const endGame = () => {
      gameRef.update({
        gameEnded: true
      });
    };

    gameRef.update({
      gameStarted: true
    });
    setTimeout(endGame, 60000);
  }

  handleWordInputChange (e) {
    e.preventDefault();
    this.setState({inputVal: e.target.value});
  }

  handleWordSubmit (e) {
    e.preventDefault();

    const player = e.target.name;
    const submittedWord = e.target.word.value.toLowerCase();
    const tooShortMsg = "Your word must contain at least two letters. Please try again."
    const wrongCharMsg = "You may only use the provided letters. Please try again."
    const notUniqueCharMsg = "You can use each letter only once. Please try again."
    const notUniqueWordMsg = "You've already submitted that word. Please try again."

    this.setState({inputVal: submittedWord});
    // check if string is empty or too short
    if (submittedWord.length <= 1) {
      this.setState({
        [player]: {...this.state[player], errorMsg: tooShortMsg}
      });
    // check only given letters are used
    } else if (!this.hasOnlyGivenChars(submittedWord)) {
      this.setState({
        [player]: {...this.state[player], errorMsg: wrongCharMsg}
      });
    // check that each letter is used only once
    } else if (!this.isUnique(submittedWord)) {
      this.setState({
        [player]: {...this.state[player], errorMsg: notUniqueCharMsg}
      });
    // check to see if word was already submitted
    } else if (this.state[player].submittedWords.includes(submittedWord)) {
      this.setState({
        [player]: {...this.state[player], errorMsg: notUniqueWordMsg}
      });
    // submit valid word
    } else {
      this.setState({
        [player]: {...this.state[player], 
          submittedWords: [...this.state[player].submittedWords, submittedWord], 
          errorMsg: ''},
        inputVal: ''
      });
    }
  }

  render () {
    return (
      this.state.loggedIn === false 
      ? <div>
          <form onSubmit={this.createOrJoinGame}>
            <label>Enter your username:
              <input name="username">
              </input><br/>
            </label>
            <Button 
              type="start-game-button"
              disabled={this.state.gameID}
              buttonText={
                this.props.match.params.game_id === undefined 
                ? "Start New Game"
                : "Join Game"
              }
           />
          </form>
        </div>
      : <Game 
          gameStarted={this.state.gameStarted}
          gameEnded={this.state.gameEnded}
          gameLetters={this.state.gameLetters}
          wordSubmit={this.handleWordSubmit}
          playerOne={this.state.playerOne}
          playerTwo={this.state.playerTwo}
          gameID={this.state.gameID}
          startGame={this.startGame}
          inputVal={this.state.inputVal}
          handleWordInputChange={this.handleWordInputChange}
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