import React from 'react';
import Button from '../Button/Button.jsx';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      firstUser: ""
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame (e) {
    e.preventDefault();
    this.setState({firstUser:e.target.username.value});
  }

  render () {
    return (
      <div>
        <form onSubmit={this.startGame}>
          <label>Enter your username:
            <input name="username" defaultValue={this.state.firstUser}></input><br/>
          </label>
          <Button 
            type="start-game-button"
            buttonText="Start New Game"
         />
        </form>
      </div>
    )
  }
}

export default Main;