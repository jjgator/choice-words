import React from 'react';
import Button from '../Button/Button.jsx';

const Player = (props) => {
  return (
    <div className="player">
      <p>username here</p>
      <form onSubmit={props.wordSubmit}>
        <input name="word">
        </input>
        <Button buttonText="Enter"/>
      </form>
    </div>
  )
}

export default Player;