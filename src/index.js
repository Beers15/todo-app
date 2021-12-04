import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import Settings from './context/settings';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";


class Main extends React.Component {
  render() {
    return (
      <Settings>
        <App />
      </Settings>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
