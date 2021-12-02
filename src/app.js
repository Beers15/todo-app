import React from 'react';

import ToDo from './components/todo.js';
import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <ToDo />
    );
  }
}
