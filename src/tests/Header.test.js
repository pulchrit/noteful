import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import Header from "../components/Header";

describe("Header component", () => {
    it("renders without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders UI as expected', () => {
        const wrapper = shallow(<Header />);
        expect(toJson(wrapper)).toMatchSnapshot();
      });
});