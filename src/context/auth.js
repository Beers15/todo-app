import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

/* This app doesn't have a backend, to include a DB. Registered users 
   will be added to this object, which doesn't persist on app restart
   TODO: add bcrypt for passwords and persist to localstorage */
const userPool = {
  admin: {password:'password', username: 'admin', role:'admin', capabilities:['create','read','update','delete']},
  editor: { password: 'password', username: 'editor', role: 'editor', capabilities: ['read', 'create', 'update']},
  writer: { password: 'password', username: 'writer', role: 'writer', capabilities: ['create', 'read']},
};

export const AuthContext = React.createContext();

const Auth = ({children}) => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState({ capabilities: [] });

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  const can = (capability) => {
    return values?.user?.capabilities?.includes(capability);
  }

  const login = (username, password) => {
    if(userPool[username]) {
      //Create a "good" token, like you'd get from a server
      const token = jwt.sign(userPool[username], process.env.REACT_APP_SECRET || 'SECRET');
      let user = validateToken(token);
      if(user && userPool[username].password === password) {
        setLoginState(true, token, user);
      }
    } else {
      console.log("INVALID LOGIN");
      return false;
    }
  }

  const logout = () => {
    setLoginState(false, null, {});
  };

  const register = (username, password) => {
    if(userPool[username] || password === '' || username === '') {
      return false;
    } else {
      userPool[username] = { username, password, role:'admin', capabilities:['create','read','update','delete'] }
      const token = jwt.sign(userPool[username], process.env.REACT_APP_SECRET || 'SECRET');
      let user = validateToken(token);
      if(user) {
        setLoginState(true, token, user);
      }
    }
  }

  let values = {
    loggedIn,
    user,
    can,
    login,
    logout,
    register,
  };

  const validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET || 'SECRET');
      if(user) {
        return user;
      } else { 
        return false;
      }
      
    }
    catch(e) {
      setLoginState(false, null, {});
      console.log('Token Validation Error', e);
      return false;
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setLoggedIn(loggedIn);
    setUser(user);
    //setToken(token);
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;