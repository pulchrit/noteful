import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import NoteMain from '../components/NoteMain';

const note =  {
    "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
    "name": "Cats",
    "modified": "2018-08-15T23:00:00.000Z",
    "folderId": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
    "content": "Eos laudantium quia ab blanditiis temporibus necessitatibus. Culpa et voluptas ut sed commodi. Est qui ducimus id. Beatae sint aspernatur error ullam quae illum sint eum. Voluptas corrupti praesentium soluta cumque illo impedit vero omnis nisi.\n \rNam sunt reprehenderit soluta quis explicabo impedit id. Repudiandae eligendi libero ad ut dolores. Laborum nihil sint et labore iusto reiciendis cum. Repellat quos recusandae natus nobis ullam autem veniam id.\n \rEsse blanditiis neque tempore ex voluptate commodi nemo. Velit sapiente at placeat eveniet ut rem. Quidem harum ut dignissimos. Omnis pariatur quas aperiam. Quasi voluptas qui nulla. Iure quas veniam aut quia et."
};

describe("NoteMain component", () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <NoteMain 
            note={note}
        />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
