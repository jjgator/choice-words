import React from 'react';
import Button from '../Button/Button.jsx';
import Game from '../Game/Game.jsx';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firstUser: null,
      gameStarted: false
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame (e) {
    e.preventDefault();
    this.setState({firstUser:e.target.username.value});
  }

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
      <Game gameStarted={this.state.gameStarted}/>
    )
  }
}

export default Main;