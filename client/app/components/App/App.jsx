import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main.jsx';

const App = () => (
  <div className="flex-container">
    <Switch>
      <Route exact path='/' component={Main}></Route>
      <Route path='/player2/:game_id' component={Main}></Route>
    </Switch>
  </div>
)

export default App;