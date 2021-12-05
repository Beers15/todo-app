import{ useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Button, InputGroup, Card, Elevation, Alert } from "@blueprintjs/core";

const RegisterForm = () => {
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

  const handleSubmit = e => {
    e.preventDefault();
    let validRegister = auth.register(username, password);
    if(!validRegister) {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Card interactive={false} elevation={Elevation.TWO}>
        <form onSubmit={handleSubmit}>
          <InputGroup
            data-testid="username-field-reg"
            className="margin-1"
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <InputGroup 
            data-testid="password-field-reg"
            className="margin-1"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Button className="submit-btn" type="submit" intent="success" data-testid="register">Register</Button>
        </form>
      </Card>
      <Alert
        confirmButtonText="X"
        isOpen={showAlert}
        loading={false}
        onClose={() => {setShowAlert(false)}}
      >
        <p>Unable to make an account with those credentials. Please try another username.</p>
      </Alert>
    </>
  );
}

export default RegisterForm;
