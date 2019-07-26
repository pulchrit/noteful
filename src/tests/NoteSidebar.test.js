import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import NoteSidebar from '../components/NoteSidebar';

const folderName = 'super';

const context = {
  notes: [
    {
      id: "d26e1452-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Zebras",
      modified: "2018-08-13T23:00:00.000Z",
      folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      content: "Veritatis porro minima perspiciatis. Repellat veniam quo iste ut"
    }, 
    {
      id: "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Cats",
      modified: "2018-08-15T23:00:00.000Z",
      folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      content: "Eos laudantium quia ab blanditiis temporibus necessitatibus."
    }
  ],
  folders: [
    {
      id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Important"
    },
    {
      id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Super"
    }
  ]
};


/* describe("NoteSidebar component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NoteSidebar 
          context={context}/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const wrapper = shallow(<NoteSidebar
      context={context}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
}); */

