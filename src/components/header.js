import React from 'react'
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <nav className="bp3-navbar bp3-light" data-testid="header">
      <div className="nav-style">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="nav-heading bp3-icon-list-detail-view"><Link to="/"> To Do List</Link></div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Link to="/settings">Settings</Link>
          <span className="bp3-navbar-divider"></span>
          <span className="bp3-icon-tick"> {props.incomplete} items pending</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
