import React from 'react'
import { Button, FormGroup, InputGroup, Card, Elevation } from "@blueprintjs/core";

const ItemForm = (props) => {
  return (  
      <form onSubmit={props.handleSubmit} data-testid="todo-form">
        <div className="bp3-callout bp3-intent-success form-caption">
          <h4 className="bp3-heading">Add To Do Item</h4>
          Get organized, get things done.
        </div>

        <Card interactive={false} elevation={Elevation.TWO}>
          <FormGroup minimal={true}>
            <span>To Do Item</span>
            <InputGroup className="input-item" onChange={props.handleChange} name="text" type="text" placeholder="Item Details" data-testid="item-details" />

            <span>Assigned To</span>
            <InputGroup className="input-item" onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" data-testid="item-assignee" />
            
            <span className="slider-label">Difficulty</span>
            <br/>
            <input className="slider" onChange={props.handleChange} name="difficulty" type="range" defaultValue="3" min={1} max={5} data-testid="item-difficulty" />
          
            <br/><Button className="submit-btn" type="submit" intent="success" data-testid="todo-submit-btn">Add Item</Button>
          </FormGroup>
         </Card>
      </form>
   
  )
}

export default ItemForm;
