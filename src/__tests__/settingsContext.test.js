
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SettingsProvider, { SettingsContext } from '../context/settings';

describe('Testing Settings Context', () => {
  let Test = () => (
    <SettingsContext.Consumer>
      {context => (
        <>
          <p data-testid="test">test</p>
          <p data-testid="showCompleted">{JSON.stringify(context.showCompleted)}</p>
          <p data-testid="sortBy">{context.sortBy}</p>
          <p data-testid="numItemsPerPage">{context.numItemsPerPage}</p>
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
});
