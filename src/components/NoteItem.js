import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
import PropTypes from 'prop-types';
import moment from 'moment';
import "../css/NoteItem.css";


function NoteItem(props){

    const determineIfRedirectIsRequired = (url) => {
      if (url.includes('/notes/')) {
        props.history.push('/');
      } 
    };

    const deleteNoteRequest = (noteId, deleteNoteFunction) => {

        fetch(`https://mysterious-citadel-85217.herokuapp.com/api/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok) {
              // get the error message from the response
              // No need to process the response to JSON here.
              // So just return res error.
              return res.then(error => {
                throw error
              })
            }
            // Don't need to process the response to JSON because the
            // response is a 204 success with NO content...so there isn't any
            // content to turn into JSON.
            return res
            //return res.json()
          })
          .then(data => {
            determineIfRedirectIsRequired(props.match.url);
            deleteNoteFunction(noteId); // removes the note from context and state
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
  noteId: PropTypes.number,
  name: PropTypes.string,
  modified: PropTypes.string,
  deleteNote: PropTypes.func //?? use PropTypes for context???
}
