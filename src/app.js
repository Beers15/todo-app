import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState } from 'react';

import Auth from './components/auth';
import Header from './components/header';
import Home from './components/home';
import Login from './components/login';
import SettingsForm from './components/settingsForm';

import './app.scss';

const App = () => {
  const [incomplete, setIncomplete] = useState([]);
  const [list, setList] = useState([]);

  return (
    <Router>
      <Header incomplete={incomplete} />
      <Login data-testid="login" />
      <Switch>
        <Route exact path="/">
          <Auth>
            <Home 
              setIncomplete={setIncomplete} 
              incomplete={incomplete}
              setList={setList}
              list={list}  
            />
          </Auth>
        </Route>
        <Route path="/settings">
          <Auth>
            <SettingsForm />
          </Auth>
        </Route>
        <Route path="*">
          <Auth>
            <Home 
              setIncomplete={setIncomplete} 
              incomplete={incomplete}
              setList={setList}
              list={list}  
            />
          </Auth>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
