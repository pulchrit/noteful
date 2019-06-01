import React from 'react';
import {Route} from 'react-router-dom';
import Data from './data';
import Header from "./Header";
import MainFolderSidebar from './MainFolderSidebar';
import NoteSidebar from './NoteSidebar';
import MainFolderMain from './MainFolderMain';
import NoteMain from './NoteMain';
import AddNote from './AddNote';
import AddFolder from './AddFolder';
import '../css/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = Data;
  }

  getFolderName(routeProps) {
    const thisNote = this.state.notes.find(note => note.id === routeProps.match.params.noteId);
    const thisFolder = this.state.folders.find(folder => folder.id === thisNote.folderId);
    return thisFolder.name;
  }

  render() {
    return (
      <>
        <Header /> 

        <div className="page-content">

          {/* Sidebar routes */ }
          <Route
              exact
              path='/' 
              render={ (routeProps) => 
                <MainFolderSidebar
                  folders={this.state.folders}
                />
              }
          />

          <Route
              path="/folder/:folderId"
              render={ (routeProps) => 
                <MainFolderSidebar
                  folders={this.state.folders}
                />
              }
          />

          <Route 
            path='/notes/:noteId'
            render={ (routeProps) =>   {           
              console.log(routeProps.history);  
              return (
                <NoteSidebar
                  folderName={this.getFolderName(routeProps)}
                  onClickGoBack={() => routeProps.history.goBack()}
                />);
                }
              }
              
          />


          {/* Main routes */ }
          <Route  
            exact
            path='/'
            render={ (routeProps) => 
              <MainFolderMain
                notes={this.state.notes}
              />
            }     
          />

          <Route 
            path="/folder/:folderId"
            render={ (routeProps) => 
              <MainFolderMain 
                notes={this.state.notes.reduce((selectedNotes, currentNote) => {
                  if (currentNote.folderId === routeProps.match.params.folderId) {
                    selectedNotes.push(currentNote)
                  }
                  return selectedNotes;
                }, [])}
             /> 
            }
          />


          <Route 
            path='/notes/:noteId'
            render={ (routeProps) =>
              <NoteMain
                note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}
              />
            }
          />


          {/*  Add note and folder routes */ }
          <Route 
              path='/addNote'
              component={AddNote}
          />

          <Route 
              path='/addFolder'
              component={AddFolder}
          />
        
        </div>
      </>
    );
  }
}

export default App;
