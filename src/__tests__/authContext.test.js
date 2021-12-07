import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider, { AuthContext } from '../context/auth';

import LoginForm from '../components/loginForm';
import Header from '../components/header';

//use our mock service worker that mocks the auth api server
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Testing the Auth Context Provider and related forms', () => {
  let Test = () => {
    let auth = useContext(AuthContext);

    return (
      <>
        <p data-testid="user">{auth.user?.username}</p>
        <p data-testid="isLoggedIn">{JSON.stringify(auth.loggedIn)}</p>
        <LoginForm data-testid="login" />
        <p data-testid="authorized-read">{JSON.stringify(auth.can('read'))}</p>
        <p data-testid="authorized-create">{JSON.stringify(auth.can('create'))}</p>
        <p data-testid="authorized-update">{JSON.stringify(auth.can('update'))}</p>
        <p data-testid="authorized-delete">{JSON.stringify(auth.can('delete'))}</p>
      </>
    );
  };

  beforeEach(async () => {
    render (
      <AuthProvider>
        <Router>
          <Header />
        </Router>
        <Test />
      </AuthProvider>
    );
  });

  afterEach(() => {
    try {
      let button = screen.getByTestId('logout');
      fireEvent.click(button);
    } catch(err) {
      //catch block to handle race conditions
    }
  });

  it('has auth context contains correct values before a user logs in', () => {
    expect(screen.getByTestId('user')).toHaveTextContent('');
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
  });

  it('should be able to log in a user with valid username and password and have the correct auth context values', async () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: "12345"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "alexTheAdmin"
      }
    });

    let button = screen.getByTestId('login');

    fireEvent.click(button);
  
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('alexTheAdmin');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    });
  });

  it('should be able to authorize a user based on capability and recognize if someone has admin permissions', async () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: "12345"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "alexTheAdmin"
      }
    });
  
    let button = screen.getByTestId('login');
    
    await fireEvent.click(button);


    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('alexTheAdmin');
      expect(screen.getByTestId('authorized-read')).toHaveTextContent('true');
      expect(screen.getByTestId('authorized-create')).toHaveTextContent('true');
      expect(screen.getByTestId('authorized-update')).toHaveTextContent('true');
      expect(screen.getByTestId('authorized-delete')).toHaveTextContent('true');
    });
  });

  it('should be able to authorize a user based on capability and recognize if someone has user permissions', async () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: "12345"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "alexTheUser"
      }
    });
  
    let button = screen.getByTestId('login');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('alexTheUser');
      expect(screen.getByTestId('authorized-read')).toHaveTextContent('true');
      expect(screen.getByTestId('authorized-create')).toHaveTextContent('false');
      expect(screen.getByTestId('authorized-update')).toHaveTextContent('false');
      expect(screen.getByTestId('authorized-delete')).toHaveTextContent('false');
    });
  });

  it('should be able to logout a User', async () => { 
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: "12345"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "alexTheAdmin"
      }
    });
   
    let button = screen.getByTestId('login');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('alexTheAdmin');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    });

    button = screen.getByTestId('logout');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('false');
    });
  });
});
