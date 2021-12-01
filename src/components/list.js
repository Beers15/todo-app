import React from 'react'
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/theme';
import { Button } from "@blueprintjs/core";

const List = (props) => {
  const settings = useContext(ThemeContext);
  let [startIndex, setStartIndex] = useState(0);

  const handleNextClick = () => {
    setStartIndex(startIndex + (settings.numItemsPerPage));
  }

  const handlePrevClick = () => {
    setStartIndex(startIndex - (settings.numItemsPerPage));
  }

  return (
    <div>
      {props.list.slice(startIndex, startIndex + settings.numItemsPerPage).map((item, key) => (
        <div key={key}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
      
      {startIndex > settings.numItemsPerPage - 1 && (
        <Button onClick={handlePrevClick} icon="arrow-left" intent="primary">Previous Page</Button>
      )}
      {(props.list.length > settings.numItemsPerPage && startIndex < props.list.length - 1) && 
        (<Button onClick={handleNextClick} icon="arrow-right" intent="primary">Next Page</Button>
      )}
    </div>
  )
}
export default List;
