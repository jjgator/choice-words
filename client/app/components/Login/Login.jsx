import React from 'react';
import Button from '../Button/Button.jsx';

const Login = (props) => {
  return (
    <div className="login">
      <h4>Choice Words</h4>
      <div className="border"></div>
      <p>Race your opponent to create as many words<br/>as possible in one minute!</p>
      <form onSubmit={props.onSubmit} className="login-form">
        <label>Enter a username:
          <input name="username">
          </input>
        </label>
        <Button 
          type="start-game-button"
          disabled={props.gameID}
          buttonText={
            props.params === undefined 
            ? "Start New Game"
            : "Join Game"
          }
       />
      </form>
    </div>
  )
}

export default Login;