import React, { useContext } from 'react'
import { AuthContext } from '../context/auth';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import { Button } from "@blueprintjs/core";

const Header = (props) => {
  const auth = useContext(AuthContext);

  return (
    <nav className="bp3-navbar bp3-light" data-testid="header">
      <div className="nav-style">
        <div className="bp3-navbar-group bp3-align-left">
          <div className="nav-heading bp3-icon-list-detail-view"><Link to="/"> To Do List</Link></div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <When condition={auth.loggedIn}>
            <Link to="/settings" data-testid="settings">Settings</Link>
          </When>
          <span className="bp3-navbar-divider"></span>
          {props.incomplete > 0 && (
            <>
              <span className="bp3-icon-tick">{props.incomplete} items pending</span>
              <span className="bp3-navbar-divider"></span>
            </>
          )}
          <When condition={auth.loggedIn}>
            <Button data-testid="logout" onClick={auth.logout}>Log Out</Button>
          </When>
        </div>
      </div>
    </nav>
  );
}

export default Header;
