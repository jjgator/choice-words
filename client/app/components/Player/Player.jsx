import React from 'react';
import Button from '../Button/Button.jsx';

const Player = (props) => {
  return (
    props.username !== null 
    ? <div className="player">
        <p>{props.username}</p>
        <form onSubmit={props.wordSubmit}>
          <input name="word">
          </input>
          <Button buttonText="Enter"/>
        </form>
        <span className="errmsg">{props.errorMsg}</span>
        <div>{
          props.submittedWords.map((word, i) => {
            return <div key={i}><span>{word + ' '}</span><br/></div>
          })
        }</div>
      </div>
    : <div className="player">
        Waiting on second player to join. To invite a player, share this link: 
      </div>
  )
}

export default Player;