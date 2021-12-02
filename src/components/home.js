import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form.js';
import List from './list.js';
import Form from './form.js';

import { v4 as uuid } from 'uuid';

const Home = (props) => {
  const [list, setList] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;

    if(!list.includes(item)) {
      setList([...list, item]);
    } else {
      alert('Entry already exists')
    }
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map( item => {
      if ( item.id == id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    props.setIncomplete(incompleteCount);
    document.title = `To Do List: ${props.incomplete}`;
  }, [list]);

  useEffect(() => {
    document.title = `To Do List: ${props.incomplete}`;
  }, []);

  return (
    <>
      <div className="flex-container">
        <Form 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
        />
      
        <List list={list} deleteItem={deleteItem} toggleComplete={toggleComplete} />
      </div>
    </>
  );
};

export default Home;
