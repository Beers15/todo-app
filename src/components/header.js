import React from 'react'

export const Header = (props) => {
  return (
    <nav className="bp3-navbar bp3-light">
    <div className="nav-style">
      <div className="bp3-navbar-group bp3-align-left">
        <div className="nav-heading bp3-icon-list-detail-view"> To Do List</div>
      </div>
      <div className="bp3-navbar-group bp3-align-right">
      <span className="bp3-navbar-divider"></span>
        <span className="bp3-icon-tick"> {props.incomplete} items pending</span>
      </div>
    </div>
  </nav>
  )
}

export default Header;
