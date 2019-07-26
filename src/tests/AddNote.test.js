import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme'; 
import AddNote from '../components/AddNote';

/*describe("AddNote component", () => {

  const context = {
    folders: [
      {
        id: 1,
        folder_name: 'Folder 1'
      },
      { id: 2,
        folder_name: 'Folder 2'
      }
    ]
  }; 


   it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <AddNote context={context}/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const wrapper = shallow(<AddNote context={context}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
 */