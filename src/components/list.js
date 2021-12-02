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

  const displayList = (list) => {
    //may add more later
    if(settings.sortBy) {
      switch(settings.sortBy) {
        case 'difficultyLowToHigh':
          console.log("HIT");
          list.sort((a, b) => {
            let aDifficulty = a.difficulty || 0;
            let bDifficulty = b.difficulty || 0;
            return aDifficulty - bDifficulty;
          });
          break;
      case 'difficultyHighToLow':
        console.log("HIT");
        list.sort((a, b) => {
          let aDifficulty = a.difficulty || 0;
          let bDifficulty = b.difficulty || 0;
          return bDifficulty - aDifficulty;
        });
        break;
        default:
          break;
      }
    }

    let display = list.slice(startIndex, startIndex + settings.numItemsPerPage).map((item, key) => (
      <div key={key}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <p><small>Complete: {item.complete.toString()}</small></p>
       {!item.complete && (<Button onClick={() => props.toggleComplete(item.id)} icon="tick" intent="success">Mark Complete</Button>)}
        {' '}<Button onClick={() => props.deleteItem(item.id)} icon="cross" intent="danger">Delete</Button>
        <hr />
      </div>
    ));


    return display;
  }

  return (
    <div>
      {settings.showCompleted ? displayList(props.list) : displayList(props.list.filter((item) => {
        if(item.complete == false) { 
          return true;
        }
      }))}

      {startIndex > settings.numItemsPerPage - 1 && (
        <Button onClick={handlePrevClick} icon="arrow-left" intent="primary">Previous Page</Button>
      )}
      {(props.list.length > settings.numItemsPerPage && startIndex < props.list.length - 1) && 
        (<Button onClick={handleNextClick} icon="arrow-right" intent="primary">Next Page</Button>
      )}
      <br /><br /><p><i>{settings.showCompleted ? '' : 'not '}showing completed tasks</i></p>
    </div>
  )
}
export default List;
