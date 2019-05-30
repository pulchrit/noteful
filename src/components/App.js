import React from 'react';
import {Route} from 'react-router-dom';
import Data from './data';
import Header from "./Header";
import Sidebar from './Sidebar';
import MainFolderSidebar from './MainFolderSidebar';
import '../css/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = Data;
  }

  render() {
    return (
      <>
        {/*  since there is no path, the Header will always be displayed. */ }
        <Route component={<Header />} /> 

        <Sidebar>
          <Route
              path='/' 
              render={ (routerProps) => 
                <MainFolderSidebar
                  folders={this.state.folders}
                />
              }
          />
          {/* <Route 
            path="/folder/:folderID"
            render={ (routerProps) => 
              <MainFolderSidebar
                folder
              />

            }
          /> */}
        </Sidebar>
        

      </>
    );
  }
}

export default App;
