import React from 'react';

const NotefulContext = React.createContext({
  data: {
    folders: [],
    notes: []
  },
  deleteNote: () => {},
  //addFolder: () => {},
  //addNote: () => {}
})

export default NotefulContext;