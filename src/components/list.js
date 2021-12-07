import React from 'react'
import { useContext, useState } from 'react';
import { SettingsContext } from '../context/settings';
import { Button } from "@blueprintjs/core";
import TodoItem from './todoItem';

const List = (props) => {
  const settings = useContext(SettingsContext);
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
          list.sort((a, b) => {
            let aDifficulty = a.difficulty || 0;
            let bDifficulty = b.difficulty || 0;
            return aDifficulty - bDifficulty;
          });
          break;
      case 'difficultyHighToLow':
        list.sort((a, b) => {
          let aDifficulty = a.difficulty || 0;
          let bDifficulty = b.difficulty || 0;
          return bDifficulty - aDifficulty;
        });
        break;
      case 'assignee':
        list.sort((a, b) => {
          let aAssignee = a.assignee || 'z';
          let bAssignee = b.assignee || 'z';
          return aAssignee.localeCompare(bAssignee);
        });
        break;
      default:
        break;
      }
    }

    let display = list.slice(startIndex, startIndex + settings.numItemsPerPage).map((item, key) => (
      <TodoItem key={key} deleteItem={props.deleteItem} toggleComplete={props.toggleComplete} item={item} />
    ));

    return display;
  }

  return (
    <div className="list-margin">
      <div className="list-flex-container">
        {settings.showCompleted === 'true' ? displayList(props.list) : displayList(props.list.filter((item) => {
          if(item.complete == false) { 
            return true;
          } 
        }))}
      </div>
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
