import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import "../css/NoteItem.css";


const deleteNoteRequest = (noteId, deleteNote) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        /* this.props.history.push('/') */
        
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        deleteNote(noteId)
        
      })
      .catch(error => {
        console.error(error)
      })
};

export default function NoteItem(props) {

        return (
            <NotefulContext.Consumer>
                {(context) => (
                    <section className="note-item">
                        <h2 className="note-title">
                            <Link to={`/notes/${props.noteId}`}>
                                {props.name}
                            </Link>
                        </h2>
                        <div className="date-delete">
                            <p className="date">{`Date last modified: ${new Date(props.modified)}`}</p>
                            
                            <button
                                className="delete-button"
                                onClick={() => 
                                    deleteNoteRequest(props.noteId, context.deleteNote)}
                            >
                                Delete
                            </button>
                        </div>
                    </section>
                )}
            </NotefulContext.Consumer>
            
        );  
}

