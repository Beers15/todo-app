import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";

const TodoItem = (props) => {
  return (
    <Card className="todo-item-card" interactive={true} elevation={Elevation.TWO} data-testid="todoItem">
      <h4>Task: {props.item.text}</h4>
      <p data-testid="todo-assignee"><small>Assigned to: {props.item.assignee}</small></p>
      <p data-testid="todo-difficulty"><small>Difficulty: {props.item.difficulty}</small></p>
      <p data-testid="todo-completed"><small>Complete: {props.item.complete.toString()}</small></p>
      {!props.item.complete && (<Button onClick={() => props.toggleComplete(props.item.id)} icon="tick" intent="success">Mark Complete</Button>)}
      {' '}<Button onClick={() => props.deleteItem(props.item.id)} icon="cross" intent="danger">Delete</Button>
    </Card>
  )
}

export default TodoItem;
