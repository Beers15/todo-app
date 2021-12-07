import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app';
import SettingsProvider from '../context/settings';
import AuthProvider, { AuthContext } from '../context/auth';

//use our mock service worker that mocks the auth api server
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


beforeEach(() => {
  render(
    <AuthProvider>
      <SettingsProvider>
      <AuthContext.Consumer>
        {context => (
          <>
            <p data-testid='isLoggedIn'>{JSON.stringify(context.loggedIn)}</p>
            <p data-testid='user'>{JSON.stringify(context.user?.username)}</p>
          </>
        )}
      </AuthContext.Consumer>
        <App />
    </SettingsProvider>
  </AuthProvider>
  );
})

describe('Testing basic flow of actions in todo app', () => {
  it('should properly render the application\'s initial components', async () => {
    let header = screen.getByTestId('header');
    let loginTab = screen.getByTestId('login-tab');
    let registerTab = screen.getByTestId('login-tab');

    expect(header).toBeInTheDocument();
    expect(loginTab).toBeInTheDocument();
    expect(registerTab).toBeInTheDocument();
  });

  it('should be able to allow an existing user to login', async () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: '12345'
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: 'latenightalex'
      }
    });

    let button = screen.getByTestId('login');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('latenightalex');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    })
  });

  it('should be able to allow a user to register', async () => {
    let registerTab = screen.getByTestId('register-tab');
    fireEvent.click(registerTab);

    let passwordField = screen.getByTestId('password-field-reg');
    let usernameField = screen.getByTestId('username-field-reg');

    fireEvent.change(passwordField, {
      target: {
        value: '12345'
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: 'foobarqux'
      }
    });

    await waitFor(() => {
      let button = screen.getByTestId('register');
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('foobarqux');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    });
  });

  it('Should allow users to create a todo item', async () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: '12345'
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: 'latenightalex'
      }
    });

    let button = screen.getByTestId('login');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('latenightalex');
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    });

    let itemDetails = screen.getByTestId('item-details');
    let itemDifficulty = screen.getByTestId('item-difficulty');
    let itemAssignee = screen.getByTestId('item-assignee');
    let todoSubmitBtn = screen.getByTestId('todo-submit-btn');

    fireEvent.change(itemDetails, {
      target: {
        value: 'Wash the dishes.'
      }
    });

    fireEvent.change(itemDifficulty, {
      target: {
        value: 5
      }
    });

    fireEvent.change(itemAssignee, {
      target: {
        value: 'Alex'
      }
    });

    fireEvent.click(todoSubmitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('todoItem')).toBeInTheDocument();
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
    });
  });
});