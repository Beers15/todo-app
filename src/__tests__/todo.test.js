import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app';

describe('Testing the Todo App', () => {
  it('should properly render application', async () => {
    render(<App />);

    await waitFor(() => {
      screen.getByTestId('list');
      //screen.getByTestId('bar');
    });

    expect(screen.getByTestId('list')).toBeInTheDocument();
    //expect(screen.getByTestId('bar')).toBeInTheDocument();
  });
});