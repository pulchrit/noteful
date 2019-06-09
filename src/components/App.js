import React from 'react';
import {Route} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import Header from "./Header";
import MainFolderSidebar from './MainFolderSidebar';
import NoteSidebar from './NoteSidebar';
import MainFolderMain from './MainFolderMain';
import NoteMain from './NoteMain';
import AddNote from './AddNote';
import AddFolder from './AddFolder';
import NotefulError from './NotefulError';
import '../css/App.css';

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    error: null,
/*     addNote: () => {},
    addFolder: () => {},
    deleteNote: () => {} */
  }

  addNote = (note) => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    })
  }

  addFolder = (folder) => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    })  
  }

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(note => 
      note.id !== noteId);

    this.setState({
        notes: newNotes
    });
  }

  componentDidMount() {

    // Attribution for Promise.all and getFoldersNotes function: https://tinyurl.com/y42df8dz
    const endpoints = ["http://localhost:9090/folders", "http://localhost:9090/notes"];

    // Promise.all will call this function and fetch the data for each endpoint (folder and
    // notes). It should return the folers/notes as a json object or return an error if the 
    // Promise was rejected.
    const getFoldersNotes = (endpoint) => fetch(endpoint, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
  

    // Call each endpoint, but block the data processing (i.e., setting state) until
    // both Promises have returned successfully or been rejected. (And, actually, I think
    // Promise.all will reject as soon as one of the promises rejects.)
    Promise
      .all(endpoints.map(getFoldersNotes))
      .then(dataArray => 
          this.setState({
              folders: dataArray[0],
              notes: dataArray[1]
          }))
      .catch(error => this.setState({ error }))
    }

  render() {
    // Save contextValue based on state and the methods to update state
    // and pass this contextValue to the Context.Provider below. Now, the 
    // components that render within the ContextProvider will have access to this
    // updated state/context.
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }

    return (
      <>
        <Header /> 

        <NotefulContext.Provider value={contextValue}>
          <div className="page-content">

            {/* Sidebar routes */ }
            <NotefulError>
              <Route
                  exact
                  path='/' 
                  component={MainFolderSidebar} 
              />

              <Route
                  path="/folder/:folderId"
                  component={MainFolderSidebar} 
              />

              <Route 
                path='/notes/:noteId'
                component={NoteSidebar}
              />
            </NotefulError>

            {/* Main routes */ }
            <NotefulError>
              <Route  
                exact
                path='/'
                component={MainFolderMain}    
              />

              <Route 
                path="/folder/:folderId"
                component={MainFolderMain}
              />


              <Route 
                path='/notes/:noteId'
                component={NoteMain}
              />
            </NotefulError>

            {/*  Add note and folder routes */ }
            <NotefulError>
              <Route 
                  path='/addNote'
                  component={AddNote}
              />
            </NotefulError>

            <NotefulError>
              <Route 
                  path='/addFolder'
                  component={AddFolder}
              />
            </NotefulError>
          
          </div>
        </NotefulContext.Provider>
        
      </>
    );
  }
}

export default App;
