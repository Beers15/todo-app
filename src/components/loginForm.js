import{ useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { Button, InputGroup, Card, Elevation, Alert } from "@blueprintjs/core";


const LoginForm = () => {
  useEffect(() => {
    return (() => {
      setShowAlert(false);
    })
  }, []);

  const auth = useContext(AuthContext);

  let [ username, setUsername ] = useState('');
  let [ password, setPassword ] = useState('');
  let [ showAlert, setShowAlert ] = useState(false); 

  const handleChange = e => {
    if(e.target.name === 'username') {
      setUsername(e.target.value);
    }
    if(e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let validLogin = await auth.login(username, password);
    if(!validLogin) {
      setShowAlert(true);
    }
  };

  return ( 
    <>
      <Card interactive={false} elevation={Elevation.TWO}>
        <form onSubmit={handleSubmit}>
          <InputGroup
            data-testid="username-field"
            className="margin-1"
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <InputGroup 
            data-testid="password-field"
            className="margin-1"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Button className="submit-btn" type="submit" intent="success" data-testid="login">Login</Button>
        </form>
      </Card>
      <Alert
        confirmButtonText="X"
        isOpen={showAlert}
        loading={false}
        onClose={() => {setShowAlert(false)}}
      >
        <p>Unable to login with those credentials. Please try again.</p>
      </Alert>
    </>
  );
}


export default LoginForm;
