import React, { useContext } from 'react';
import { When } from 'react-if';
import { Tab, Tabs } from "@blueprintjs/core";
import { AuthContext } from '../context/auth';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';

const LoginAndRegister = () =>  {
  const auth = useContext(AuthContext);

  return (
    <div className="flex-container">
      <When condition={!auth.loggedIn}>
        <Tabs animate={true}>
          <Tab id="login" title="Login" panel={<LoginForm />} data-testid="login-tab" />
          <Tab id="register" title="Register" panel={<RegisterForm />} data-testid="register-tab" />
          <Tabs.Expander />
        </Tabs>
      </When>
    </div>
  );
}

export default LoginAndRegister;