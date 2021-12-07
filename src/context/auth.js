import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

export const AuthContext = React.createContext();

const Auth = ({children}) => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState({ capabilities: [] });

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    cookie.save('auth', qs.get('token') || cookie.load('auth') || null);
  }, []);

  const can = capability => {
    return values?.user?.capabilities?.includes(capability);
  }

  const login = async (username, password) => {
    if(username === '' || password === '') {
      return false;
    }
    try {
      let res = await axios.post('https://api-integration-server.herokuapp.com/signin', {},  {
        auth: {
          username,
          password
        }
      });
      setLoginState(true, res.data.user);
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  const logout = () => {
    setLoginState(false, null, {});
  };

  const register = async (username, password) => {
    if(username === '' || password === '') {
      return false;
    }

    try {
      let res = await axios.post('https://api-integration-server.herokuapp.com/signup', { username, password, role: "admin" });
      setLoginState(true, res.data.user);
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  const setLoginState = (loggedIn, user) => {
    cookie.save('auth', user?.token);
    setLoggedIn(loggedIn);
    setUser(user);
  };

  let values = {
    loggedIn,
    user,
    can,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
