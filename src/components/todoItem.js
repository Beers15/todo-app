import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";

const TodoItem = (props) => {
  return (
    <Card interactive={true} elevation={Elevation.TWO}>
      <h5>{props.item.text}</h5>
      <p><small>Assigned to: {props.item.assignee}</small></p>
      <p><small>Difficulty: {props.item.difficulty}</small></p>
      <p><small>Complete: {props.item.complete.toString()}</small></p>
      {!props.item.complete && (<Button onClick={() => props.toggleComplete(props.item.id)} icon="tick" intent="success">Mark Complete</Button>)}
      {' '}<Button onClick={() => props.deleteItem(props.item.id)} icon="cross" intent="danger">Delete</Button>
    </Card>
  )
}

export default TodoItem;
