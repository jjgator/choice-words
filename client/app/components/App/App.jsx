import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showSlider: false
    };
    this.onClick = this.onClick.bind(this);
  };

  onClick () {
    console.log("can you see me");
    this.setState({showSlider: !this.state.showSlider});
  }

  render () {
    return (
      <div className="flex-container">
        <div className={this.state.showSlider === false ? "slider" : "slider active"}>
          <button className="slider-close" onClick={this.onClick}>X</button>
          <div className="slider-heading">Rules</div>
          <ol className="rules-list">
            <li className="rules-list-item">Play smart</li>
            <li className="rules-list-item">Don't F it up</li>
            <li className="rules-list-item">Be mean to your opponent</li>
          </ol>
        </div>
        <button className="rules-link" onClick={this.onClick}>Rules</button>
        <Switch>
          <Route exact path='/' component={Main}></Route>
          <Route path='/player2/:game_id' component={Main}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;