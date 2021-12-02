import React, { useState, useEffect } from 'react';


export const ThemeContext = React.createContext();

const Theme = (props) => {
  const [ completed, setCompleted ] = useState();
  const [ numItemsPerPage, setNumItemsPerPage ] = useState();
  const [ sortBy, setSortBy ] = useState();

  useEffect(() => {
    //update local storage with user settings every time they change a setting
    let settings = [completed, numItemsPerPage, sortBy];
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [completed, numItemsPerPage, sortBy]);

  useEffect(() => {
    if(localStorage.getItem('settings')) {
      let settings = localStorage.getItem('settings');
      console.log("SETTINGS FROM LAST TIME: ", settings);
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