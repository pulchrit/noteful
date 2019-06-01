import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import NoteSidebar from '../components/NoteSidebar';

const folderName = 'super';
const routeProps = 
    <BrowserRouter>
        <NoteSidebar folderName={folderName} onClickGoBack={() => routeProps.history.goBack()}/>
    </BrowserRouter>;
const onClickGoBack = () => routeProps.history.goBack();

describe("NoteSidebar component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NoteSidebar />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI of the sidebar correctly', () => {
    const wrapper = shallow(<NoteSidebar folderName={folderName} onClickGoBack={onClickGoBack} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

 /*  it('renders UI correctly after click of "go back" button', () => {
    const wrapper = shallow(<NoteSidebar folderName={folderName} onClickGoBack={() => routeProps.history.goBack()} />);
    wrapper.find('.go-back-button').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  }); */
});

