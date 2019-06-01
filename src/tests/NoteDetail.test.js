import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import NoteDetail from '../components/NoteDetail';

const content = "Veritatis porro minima perspiciatis. Repellat veniam quo iste ut. Iusto voluptas quae quibusdam. Odit neque iusto cupiditate iste quam. Fuga itaque aut praesentium ullam saepe ut et vero.\n \rQuisquam doloremque molestiae. Enim rerum dolorem et velit itaque magnam laborum. Aut officiis porro.\n \rQuae eum eaque error. Sed itaque ipsam nam provident aut voluptate. Perferendis repudiandae sequi laudantium est est animi eum. Unde alias et doloribus est hic et. Sed distinctio incidunt maiores aut voluptatibus et omnis mollitia fugit.";


describe("NoteDetail component", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NoteDetail />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the note content", () => {
      const wrapper = shallow(<BrowserRouter><NoteDetail content={content} /></BrowserRouter>);
      expect(toJson(wrapper)).toMatchSnapshot();
    })
});
