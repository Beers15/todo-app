import React, { useState, useContext } from 'react';
import { When } from 'react-if';

import { AuthContext } from '../context/auth';

const Login = () =>  {
  const auth = useContext(AuthContext);

  let [ username, setUsername ] = useState('');
  let [ password, setPassword ] = useState('');

  const handleChange = e => {
    if(e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if(e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth.login(username, password);
  };

  return (
    <>
      <When condition={auth.loggedIn}>
        <button data-testid="logout" onClick={auth.logout}>Log Out</button>
      </When>

      <When condition={!auth.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            data-testid="username-field"
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input 
            data-testid="password-field"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button data-testid="login">Login</button>
        </form>
      </When>
    </>
  );
}

export default Login;