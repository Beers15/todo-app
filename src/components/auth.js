import React, { useContext } from 'react';
import { When } from 'react-if';

import { AuthContext } from '../context/auth';

const Auth = (props) => {
  const auth = useContext(AuthContext);

  const isLoggedIn = auth.loggedIn;
  const canDo = props.capability ? settings.can(props.capability) : true;
  const okToRender = isLoggedIn && canDo;

  return (
    <When condition={okToRender}>
      {props.children}
    </When>
  );
}

export default Auth;