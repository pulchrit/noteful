import React from 'react';
import NoteItem from './NoteItem';
import {Link} from 'react-router-dom';
import "../css/MainFolderMain.css";

const MainFolderMain = (props) => (
    <main className="main">
        
        { props.notes.map(note => 
           /*  <div key={note.id}> */
            <NoteItem 
                key={note.id}
                noteId={note.id}
                name={note.name}
                modified={note.modified}
                folderId={note.folderId}
            />
           /*  </div> */
        )}

        <Link to="/addNote" className="add-button">Add note</Link>
    </main>
)

export default MainFolderMain;

