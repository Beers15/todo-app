import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SettingsProvider, { SettingsContext } from '../context/settings';
import AuthProvider from '../context/auth';
import Header from '../components/header';
import LoginForm from '../components/loginForm';
import SettingsForm from '../components/settingsForm';


describe('Testing Settings Context', () => {
  let Test = () => (
    <SettingsContext.Consumer>
      {context => (
        <>
          <p data-testid="test">test</p>
          <p data-testid="showCompleted">{JSON.stringify(context.showCompleted)}</p>
          <p data-testid="sortBy">{context.sortBy}</p>
          <p data-testid="numItemsPerPage">{context.numItemsPerPage}</p>
          <LoginForm data-testid="login" />
        </>
      )}
    </SettingsContext.Consumer>
  );

  it('Should show the default values for settings context global state values', () => {
    render (
      <SettingsProvider>
        <Test />
      </SettingsProvider>
    );

    // expect the consumer to read the given provider values
    expect(screen.getByTestId('showCompleted')).toHaveTextContent('false');
    expect(screen.getByTestId('sortBy')).toHaveTextContent('assignee');
    expect(screen.getByTestId('numItemsPerPage')).toHaveTextContent('3');
  });

  it('Should allow setting context values to be modified from settings form', () => {
    render (
      <AuthProvider>
        <SettingsProvider>
          <SettingsForm />
          <Router>
            <Header />
          </Router>
          <Test />
        </SettingsProvider>
      </AuthProvider>
    );

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
    
    let settingsItemsPerPage = screen.getByTestId('settings-itemsPerPage');
    let settingsShowCompleted = screen.getByTestId('settings-showCompleted');
    let settingsSortBy = screen.getByTestId('settings-sortBy');
    let settingsSubmit = screen.getByTestId('settings-submit');
    
    fireEvent.change(settingsItemsPerPage, {
      target: {
        value: 5
      }
    });

    //radio button for true
    fireEvent.click(settingsShowCompleted);
    //radio button for sort difficultyHighToLow
    fireEvent.click(settingsSortBy);

    fireEvent.click(settingsSubmit)
    expect(screen.getByTestId('showCompleted')).toHaveTextContent('true');
    expect(screen.getByTestId('sortBy')).toHaveTextContent('difficultyHighToLow');
    expect(screen.getByTestId('numItemsPerPage')).toHaveTextContent('5');
  });
});
