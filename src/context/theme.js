import React, { useState, useEffect } from 'react';


export const ThemeContext = React.createContext();

const Theme = (props) => {
  const [ completed, setCompleted ] = useState(false);
  const [ numItemsPerPage, setNumItemsPerPage ] = useState(3);
  const [ sortBy, setSortBy ] = useState('assignee');
  //to not overwrite local storage on first render
  const [ initialRender, isInitialRender ] = useState(true);

  useEffect(() => {
    if(!initialRender) {
      //update local storage with user settings every time they change a setting
      let settings = [completed, numItemsPerPage, sortBy];
      localStorage.setItem('settings', JSON.stringify(settings));
    } else {
      isInitialRender(false);
    }
  }, [completed, numItemsPerPage, sortBy]);

  useEffect(() => {
    if(localStorage.getItem('settings')) {
      let settings = JSON.parse(localStorage.getItem('settings'));
      console.log("SETTINGS FROM LAST TIME: ", settings[0], settings[1], settings[2]);
      setCompleted(settings[0] || false);
      setNumItemsPerPage(settings[1] || 3);
      setSortBy(settings[2] || 'difficultyHighToLow');
    }
  }, []);

  const values = {
    showCompleted: completed,
    setCompleted,
    numItemsPerPage,
    setNumItemsPerPage,
    sortBy,
    setSortBy,
  }
  
  return (
    <ThemeContext.Provider value={values}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default Theme;