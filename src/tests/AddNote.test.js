import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme'; 
import AddNote from '../components/AddNote';

describe("AddNote component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <AddNote />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const wrapper = shallow(<AddNote />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
