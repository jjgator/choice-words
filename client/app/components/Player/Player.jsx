import React from 'react';
import Button from '../Button/Button.jsx';
import path from 'path';


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
    : <div className="player wait">
        {'Waiting on second player to join. To invite a player, share this link: '
         + path.join(window.location.href, '/player2/' + props.gameID)}
      </div>
  )
}

export default Player; 