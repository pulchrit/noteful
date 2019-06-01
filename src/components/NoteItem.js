import React from 'react';
import {Link} from 'react-router-dom';
import "../css/NoteItem.css";


const NoteItem = (props) => (
   
        <section className="note-item">
            <h2 className="note-title">
                <Link to={`/notes/${props.noteId}`}>
                    {props.name}
                </Link>
            </h2>
            <div className="date-delete">
                <p className="date">{`Date last modified: ${new Date(props.modified)}`}</p>
                {/* Below will eventually need to be a click event to update state by removing this note.  
                Need to update the to prop as well.*/}
                <Link to={`/folder/${props.folderID}`} className="delete-button">Delete</Link>
            </div>
        </section>
    
)

export default NoteItem;
