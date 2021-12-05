import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app';
import SettingsProvider from '../context/settings';
import AuthProvider, { AuthContext } from '../context/auth';

beforeEach(() => {
  render(
    <AuthProvider>
      <SettingsProvider>
      <AuthContext.Consumer>
        {context => (
          <>
            <p data-testid="isLoggedIn">{JSON.stringify(context.loggedIn)}</p>
            <p data-testid="user">{JSON.stringify(context.user.username)}</p>
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

  it('should be able to allow an existing user to login', () => {
    let passwordField = screen.getByTestId('password-field');
    let usernameField = screen.getByTestId('username-field');

    fireEvent.change(passwordField, {
      target: {
        value: "password"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "admin"
      }
    });

    let button = screen.getByTestId('login');
    fireEvent.click(button);

    expect(screen.getByTestId('user')).toHaveTextContent('admin');
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  });

  it('should be able to allow a user to register', () => {
    let logoutBtn = screen.getByTestId('logout');
    fireEvent.click(logoutBtn);

    let registerTab = screen.getByTestId('register-tab');
    fireEvent.click(registerTab);

    let passwordField = screen.getByTestId('password-field-reg');
    let usernameField = screen.getByTestId('username-field-reg');

    fireEvent.change(passwordField, {
      target: {
        value: "password"
      }
    });

    fireEvent.change(usernameField, {
      target: {
        value: "MrNewUser"
      }
    });

    let button = screen.getByTestId('register');
    fireEvent.click(button);

    expect(screen.getByTestId('user')).toHaveTextContent('MrNewUser');
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  });

  it('Should allow users to create a todo item', () => {
    let itemDetails = screen.getByTestId("item-details");
    let itemDifficulty = screen.getByTestId("item-difficulty");
    let itemAssignee = screen.getByTestId("item-assignee");
    let todoSubmitBtn = screen.getByTestId("todo-submit-btn");

    fireEvent.change(itemDetails, {
      target: {
        value: "Wash the dishes."
      }
    });

    fireEvent.change(itemDifficulty, {
      target: {
        value: 5
      }
    });

    fireEvent.change(itemAssignee, {
      target: {
        value: "Alex"
      }
    });

    fireEvent.click(todoSubmitBtn);

    expect(screen.getByTestId('todoItem')).toBeInTheDocument();
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('true');
  })
});