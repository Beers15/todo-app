import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header';
import Todo from './components/home';
import Settings from './components/settings';
import './app.scss';

const App = () => {
  const [incomplete, setIncomplete] = useState([]);

  return (
    <Router>
      <Header incomplete={incomplete} />
      <Switch>
        <Route exact path="/">
          <Todo setIncomplete={setIncomplete} incomplete={incomplete} />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
