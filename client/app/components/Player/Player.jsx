import React from 'react';
import Button from '../Button/Button.jsx';
import path from 'path';

const Player = (props) => {
  return (
    props.username !== null 
    ? <div className="player">
        <p className="username">
          {props.username}<span className="score">{props.score}</span>
        </p>
        <form 
          onSubmit={props.wordSubmit} 
          name={props.player} 
          className={props.hideInput === true ? "hide" : "show"}>
          <input 
            name="word" 
            value={props.inputVal} 
            onChange={(e) => {props.handleChange(props.player, e)}}
          />
          <Button buttonText="Enter" disabled={props.gameStarted === false || props.gameEnded === true}/>
        </form>
        <span className={props.errorMsg === '' ? "errmsg" : "errmsg show"}>{props.errorMsg}</span>
        <div className="word-list">{
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