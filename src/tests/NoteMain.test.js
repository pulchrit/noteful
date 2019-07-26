import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import NoteMain from '../components/NoteMain';


const NotefulContext = React.createContext();
 
const context = {folders: [
    {
      id: 1,
      name: "Folder 1"
    },
    {
      id: 2,
      name: "Folder 2"
    }
  ],
  notes: [
    {
      id: 1,
      note_name: "Zebras",
      date_modified: "2018-08-13T23:00:00.000Z",
      folder_id: 1,
      content: "Veritatis porro minima perspiciatis. Repellat veniam quo iste ut"
    }, 
    {
      id: 2,
      name: "Cats",
      modified: "2018-08-15T23:00:00.000Z",
      folderId: 2,
      content: "Eos laudantium quia ab blanditiis temporibus necessitatibus."
    }
  ],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {}
};



const match = {
  params: {
    noteId: 1,
  } 
};



describe("NoteMain component", () => {
  
  /* it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NotefulContext.Provider value={context}>
          <NoteMain 
              /* context={context} 
              match={match}
          />
        </NotefulContext.Provider>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  }); 

  it('renders UI as expected', () => {
    const wrapper = shallow(
      <BrowserRouter>
      <NotefulContext.Provider value={context}>
          <NoteMain
            /* context={context} 
            match={match} 
            />
      </NotefulContext.Provider>
      </BrowserRouter>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });*/
});
