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
      <span className="errmsg">{props.errorMsg}</span>
      <div>{
        props.submittedWords.map((word, i) => {
          return <div key={i}><span>{word + ' '}</span><br/></div>
        })
      }</div>
    </div>
  )
}

export default Player;