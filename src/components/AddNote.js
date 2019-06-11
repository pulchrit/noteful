import React from 'react';
import PropTypes from 'prop-types';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import "../css/AddNote.css";

export default class AddNote extends React.Component {
    
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            noteId: '',
            noteName: '',
            noteDateModified: '',
            noteFolderId: '',
            noteContent: '',
            noteNameValid: false,
            noteContentValid: false,
            noteFolderIdValid: false,
            addNoteFormValid: false,
            validationMessages: {
                noteNameMessage: '',
                noteContentMessage: '',
                noteFolderIdMessage: ''
            },
            error: null
        }
    }

    // As in the AddFolder component, I think it makes more sense to set noteId and noteDateModified in
    // handleSubmitNote(), but I was running into the issue where setState() doesn't update
    // immediately. So, I'm running functions to set noteId and noteDateModified out of this function.
    // I tried adding some callbacks (similar to setFormValid()), but did not meet with success.
    updateNoteNameIdDateModified(noteName) {
        this.setNoteId();
        this.setNoteDateModified();
        
        this.setState({noteName}, () => {this.validateNoteName(noteName)});
    }

    setNoteId() {
        const noteId = uuidv4();
        this.setState({noteId});
    }

    setNoteDateModified() {
        const noteDateModified = moment.utc();
        this.setState({noteDateModified});
    }
    
    updateNoteContent(noteContent) {
        this.setState({noteContent}, () => {this.validateNoteContent(noteContent)});
    }
    
    updateNoteFolderId(noteFolderId) {
        this.setState({noteFolderId}, () => {this.validateNoteFolderId(noteFolderId)})
    }


    validateNoteName(noteName) {
        // Make a copy of the validationMessages from state so that 
        // you can change the folderName message and pass the full
        // validationMessages object back into state.
        let errorMessages = {...this.state.validationMessages};

        let notValid = false;
        
        // Trim any white space added by the user.
        noteName = noteName.trim();

        // Determine if this note name is already in use. 
        const nameTaken = this.context.notes.includes(note =>
            note.name === noteName);

        // Ensure user has entered something for the name. 
        if (noteName.length === 0) {
            errorMessages.noteNameMessage = "Please enter a note name.";
            notValid = true;
        } else if (nameTaken) {
                errorMessages.noteNameMessage = "This note name is already in use. Please enter a different name.";
                notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            noteNameValid: !notValid
        }, this.setFormValid) //setFormValid is a callback function that will be executed after entire form as been updated.

    }

    validateNoteContent(noteContent) {
        // Make a copy of the validationMessages from state so that 
        // you can change the folderName message and pass the full
        // validationMessages object back into state.
        let errorMessages = {...this.state.validationMessages};

        let notValid = false;
        
        // Trim any inadvertent white space.
        noteContent = noteContent.trim(); 

        // Ensure user has entered something for the content. 
        if (noteContent.length === 0) {
            errorMessages.noteContentMessage = "Please enter some text that explains your note.";
            notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            noteContentValid: !notValid
        }, this.setFormValid) //setFormValid is a callback function that will be executed after entire form as been updated.

    }

    validateNoteFolderId(noteFolderId) {
        // Make a copy of the validationMessages from state so that 
        // you can change the folderName message and pass the full
        // validationMessages object back into state.
        let errorMessages = {...this.state.validationMessages};

        let notValid = false;

        // Ensure user has made a folder selection. 
        if (noteFolderId === '') {
            errorMessages.noteFolderIdMessage = "Please select a folder for your note.";
            notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            noteFolderIdValid: !notValid
        }, this.setFormValid) //setFormValid is a callback function that will be executed after entire form as been updated.

    }

    setFormValid() {
        this.setState({
            // If individual user inputs are all valid, then the form is valid.
            // You have to run this as a separate function because setState doesn't always
            // update immediately after being called. So, checking all of the input states
            // in this separate callback will ensure all previous setState() have executed. 
            addNoteFormValid:   this.state.noteNameValid 
                                && this.state.noteContentValid 
                                && this.state.noteFolderIdValid
        });
    }
    
    handleSubmitNote(event) {
        event.preventDefault();

        const note = {
            id: this.state.noteId,
            name: this.state.noteName,
            modified: this.state.noteDateModified,
            folderId: this.state.noteFolderId,
            content: this.state.noteContent
        };

        this.setState({ error: null });

        fetch(`http://localhost:9090/notes`, {
          method: 'POST',
          body: JSON.stringify(note),
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
            // reset form
            this.setState({
                noteName: '',
                noteConent: '',
                noteFolderId: ''
            });
            this.props.history.goBack(); 
            this.context.addNote(data);
          })
          .catch(error => {
            this.setState({error});
          })
    };

    
    render() {

        // Generate list of folders for <select> element of form.
        const foldersList = this.context.folders.map(folder => 
            <option key={folder.id} className='folder-option' value={folder.id}>{folder.name}</option>
            );

        return (
            <section className="add-note-section">
                <h2 className='add-form-title'>Add a note</h2>
                
                {/* If there is no API error, this will render as an empty <div>.*/}
                <div className='add-note-error' role='alert'>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </div>

                <form className='add-note-form' onSubmit={(event) => this.handleSubmitNote(event)}>
                    <label className='note-form-label' htmlFor='noteName'>
                        Please enter a name for your note:
                        <input type='text' name='noteName' id='noteName' className='note-input'
                            onChange={e => this.updateNoteNameIdDateModified(e.target.value)} />
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            notValid={!this.state.noteNameValid} 
                            validationMessage={this.state.validationMessages.noteNameMessage}
                        />
                    </label>

                    <label className='note-form-label' htmlFor='noteFolderId'>
                        Please select the folder in which to store your note:
                        <select name='noteFolderId' className='note-input'
                            onChange={e => this.updateNoteFolderId(e.target.value)}>
                            <option value='' className='folder-option'>Select one</option>
                            {foldersList}
                        </select>
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            notValid={!this.state.noteFolderIdValid} 
                            validationMessage={this.state.validationMessages.noteFolderIdMessage}
                        />
                    </label>

                    <label className='note-form-label' htmlFor='noteContent'>
                        Please enter the content for your note:
                        <textarea name="noteContent" id="noteContent" className='note-input'
                            onChange={e => this.updateNoteContent(e.target.value)} />
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            notValid={!this.state.noteContentValid} 
                            validationMessage={this.state.validationMessages.noteContentMessage}
                        />
                    </label>

                    <button type='submit' className='add-note-submit-button'
                        disabled={!this.state.addNoteFormValid}>
                            Save
                    </button>
                </form>
            </section>
        ); 
    }
}

// Validate PropTypes of context? 
AddNote.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.string,
        folderId: PropTypes.string,
        content:PropTypes.string
    })),
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    })),
    addNote: PropTypes.func
};