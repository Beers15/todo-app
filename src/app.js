import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header';
import Todo from './components/home';
import SettingsForm from './components/settingsForm';
import './app.scss';

const App = () => {
  const [incomplete, setIncomplete] = useState([]);
  const [list, setList] = useState([]);

  return (
    <Router>
      <Header incomplete={incomplete} />
      <Switch>
        <Route exact path="/">
          <Todo 
            setIncomplete={setIncomplete} 
            incomplete={incomplete}
            setList={setList}
            list={list}  
          />
        </Route>
        <Route path="/settings">
          <SettingsForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
