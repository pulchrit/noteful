import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import NoteItem from '../components/NoteItem';

const noteId = 'd26e0570-ffaf-11e8-8eb2-f2801f1b9fd1';
const modified = "2019-01-04T00:00:00.000Z";
const name = "Birds";
const folderId = "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1";
const content = "Ipsum iusto explicabo sed aut corporis maiores sunt. Qui iure ad quia at sed. Consequ";

describe("NoteItem component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NoteItem />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const wrapper = shallow(<NoteItem 
      noteId={noteId}
      modified={modified}
      name={name}
      folderId={folderId}
      content={content} 
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
