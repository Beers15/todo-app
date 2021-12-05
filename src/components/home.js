import React, { useEffect } from 'react';
import useForm from '../hooks/form.js';
import List from './list.js';
import ItemForm from './itemForm.js';

import { v4 as uuid } from 'uuid';

const Home = (props) => {
  const { handleChange, handleSubmit } = useForm(addItem);

  useEffect(() => {
    let incompleteCount = props.list.filter(item => !item.complete).length;
    props.setIncomplete(incompleteCount);
    document.title = `To Do List: ${props.incomplete}`;
  }, [props.list]);

  useEffect(() => {
    document.title = `To Do List: ${props.incomplete}`;
  }, []);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;

    if(!props.list.includes(item)) {
      props.setList([...props.list, item]);
    } else {
      alert('Entry already exists')
    }
  }

  function deleteItem(id) {
    const items = props.list.filter( item => item.id !== id );
    props.setList(items);
  }

  function toggleComplete(id) {
    const items = props.list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    props.setList(items);
  }

  return (
    <>
      <div className="flex-container">
        <ItemForm 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
        />
      
        {props.list.length > 0 && (<List list={props.list} deleteItem={deleteItem} toggleComplete={toggleComplete} /> )}
      </div>
    </>
  );
};

export default Home;
