import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../app';
import Theme from '../context/theme';

describe('Testing the Todo App', () => {
  it('should properly render the application\'s main components', async () => {
    let app = render(<Theme><App /></Theme>);

    let header = app.getByTestId('header');
    let todoForm = app.getByTestId('todo-form');

    expect(header).toBeInTheDocument();
    expect(todoForm).toBeInTheDocument();
  });

  it('should render a todo item when todo form is submitted', () => {
    let app = render(<Theme><App /></Theme>);

    let todoBtn = app.getByTestId('todo-submit-btn');

    fireEvent.click(todoBtn);

    let item = app.getByTestId('todoItem');
    expect(item).toBeInTheDocument();
  });

  it('should render a todo item with proper values when form filled out and then submitted', () => {
    let app = render(<Theme><App /></Theme>);

    let todoBtn = app.getByTestId('todo-submit-btn');
    let itemDetails = app.getByTestId('item-details');
    let itemDifficulty = app.getByTestId('item-difficulty');
    let itemAssignee = app.getByTestId('item-assignee');

    fireEvent.change(itemDetails, {
      target: {
        value: "Wash the Dishes"
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

    fireEvent.click(todoBtn);

    //since app is re-rendered each test the first todoItem id will be unique, even though every subsequent item would have same id
    let item = app.getByTestId('todoItem');
    expect(item.textContent).toBe('Task: Wash the DishesAssigned to: AlexDifficulty: 5Complete: falseMark Complete Delete');
  });
});