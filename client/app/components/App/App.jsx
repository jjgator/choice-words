import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Letters from '../Letters/Letters.jsx';


const App = () => (
  <div className="flex-container">
    <Header />
    <Switch>
      <Route exact path='/' component={Main}></Route>
      <Route path='/player2/:game_id' component={Main}></Route>
    </Switch>
  </div>
)

export default App;