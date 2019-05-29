import React from 'react';
import {Route} from 'react-router-dom';
import Data from './data';
import '../css/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = Data;
  }

  render() {
    return (
      <div className="App">

        <Route
          exact
          path="/"
          render={ () => 
            <Main>
              folders={this.state.folders}
              notes={this.state.notes}
            </Main>}
        />

        <Route 
          path="/folder/:folderID"
          render={ () => 
            <DynamicFolder>
              folders={this.state.folders}
              notes={this.state.notes}
            </DynamicFolder>}
        />

        <Route
          path="/note/:noteID"
          render={ () =>
            <DynamicNote>
              olders={this.state.folders}
              notes={this.state.notes}
            </DynamicNote>}
        />
        
      </div>
    );
  }
}

export default App;
