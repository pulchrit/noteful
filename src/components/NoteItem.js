import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
import PropTypes from 'prop-types';
import moment from 'moment';
import "../css/NoteItem.css";


function NoteItem(props){

    const deleteNoteRequest = (noteId, deleteNoteFunction) => {

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
            // Push main route '/' onto NoteMain's history here once the 
            // API call is successful. This will render the main page instead
            // of trying to render a deleted note!!
            props.history.push('/');
            deleteNoteFunction(noteId);
          })
          .catch(error => {
            console.error(error)
          })
    };

    const dateFormatted = moment(props.modified).format('MMMM Do YYYY, h:mm:ss');

    return (
            <NotefulError>
              <NotefulContext.Consumer>
                  {(context) => (
                      <section className="note-item">
                          <h2 className="note-title">
                              <Link to={`/notes/${props.noteId}`}>
                                  {props.name}
                              </Link>
                          </h2>
                          <div className="date-delete">
                              <p className="date">{`Date last modified: ${dateFormatted}`}</p>
                              <button
                                  className="delete-button"
                                  onClick={() => {
                                      deleteNoteRequest(props.noteId, context.deleteNote)}}
                              >
                                  Delete
                              </button>
                          </div>
                      </section>
                  )}
              </NotefulContext.Consumer>
            </NotefulError>   
        );  
}


// Use withRouter because it will give us the history from NoteMain thus
// allowing us to push('/') route back into the NoteMain page history.
// This will render the main route '/' instead of trying to render the 
// NoteMain page of a note that we just deleted. 
export default withRouter(NoteItem);

NoteItem.propTypes = {
  noteId: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
  deleteNote: PropTypes.func //?? use PropTypes for context???
}
