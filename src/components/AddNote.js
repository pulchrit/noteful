import React from 'react';
//import PropTypes from 'prop-types';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
//import uuidv4 from 'uuid/v4';
//import moment from 'moment';
import "../css/AddNote.css";

export default class AddNote extends React.Component {
    
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            //noteId: '',
            noteName: '',
            //noteDateModified: '',
            //noteFolderId: '',
            noteFolderId: null,
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
        this.noteNameRef = React.createRef();
        this.noteFolderRef = React.createRef();
        this.noteContentRef = React.createRef();
    }

    
    updateNoteName(noteName) {
        this.setState({noteName}, () => {this.validateNoteName(noteName)});
    }
    
    updateNoteContent(noteContent) {
        this.setState({noteContent}, () => {this.validateNoteContent(noteContent)});
    }
    
    updateNoteFolderId(noteFolderId) {
        this.setState({noteFolderId}, () => {this.validateNoteFolderId(noteFolderId)})
    }

    passFocusOnError = (refName) => {
        refName.current.focus();
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
        const nameTaken = this.context.notes.find(note =>
            note.note_name === noteName);

        // Ensure user has entered something for the name. 
        if (noteName.length === 0) {
            this.passFocusOnError(this.noteNameRef);
            errorMessages.noteNameMessage = "Please enter a note name.";
            notValid = true;
        } else if (nameTaken !== undefined) {
            this.passFocusOnError(this.noteNameRef);
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
            this.passFocusOnError(this.noteContentRef);
            errorMessages.noteContentMessage = "Please enter some text that explains your note.";
            notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            noteContentValid: !notValid
        }, this.setFormValid) //setFormValid is a callback function that will be executed after entire form has been updated.

    }

    validateNoteFolderId(noteFolderId) {
        // Make a copy of the validationMessages from state so that 
        // you can change the folderName message and pass the full
        // validationMessages object back into state.
        let errorMessages = {...this.state.validationMessages};

        let notValid = false;

        // Ensure user has made a folder selection. 
        if (noteFolderId === '') {
            this.passFocusOnError(this.noteFolderRef);
            errorMessages.noteFolderIdMessage = "Please select a folder for your note.";
            notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            noteFolderIdValid: !notValid
        }, this.setFormValid) //setFormValid is a callback function that will be executed after entire form has been updated.

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

    redirectToNoteDetailAfterAdd = (note) => {
        this.props.history.push(`/notes/${note.id}`)
    }
     
    handleSubmitNote(event) {
        event.preventDefault();
        
        /* const noteId = uuidv4();
        const noteDateModified = moment.utc();
        
        this.setState({noteId, noteDateModified}, this.updateAPIandContext);
    }
    
    updateAPIandContext() { */
    
        const note = {
            //id: this.state.noteId,
            note_name: this.state.noteName,
            //date_modified: this.state.noteDateModified,
            folder_id: this.state.noteFolderId,
            content: this.state.noteContent
        };


        this.setState({error: null});

        fetch(`https://mysterious-citadel-85217.herokuapp.com/api/notes`, {
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
                noteContent: '',
                noteFolderId: ''
            });
            this.context.addNote(data);
            this.redirectToNoteDetailAfterAdd(data);
          })
          .catch(error => {
            this.setState({error});
          })
    };

    
    render() {

        // Generate list of folders for <select> element of form.
        const foldersList = this.context.folders.map(folder => 
            <option key={folder.id} className='folder-option' value={folder.id}>{folder.folder_name}</option>
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
                        <input 
                            type='text' 
                            name='noteName' 
                            id='noteName' 
                            aria-required='true'
                            aria-label='Name for the new note'
                            aria-describedby='note-name-error'
                            ref={this.noteNameRef}
                            className='note-input'
                            onChange={e => this.updateNoteName(e.target.value)} />
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            errorName="note-name-error"
                            notValid={!this.state.noteNameValid} 
                            validationMessage={this.state.validationMessages.noteNameMessage}
                        />
                    </label>

                    <label className='note-form-label' htmlFor='noteFolderId'>
                        Please select the folder in which to store your note:
                        <select 
                            name='noteFolderId' 
                            aria-required='true'
                            aria-label='Folder to store the new note'
                            aria-describedby='note-folder-error'
                            ref={this.noteFolderRef}
                            className='note-input'
                            onChange={e => this.updateNoteFolderId(e.target.value)}>
                            <option value='' className='folder-option'>Select one</option>
                            {foldersList}
                        </select>
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            errorName='note-folder-error'
                            notValid={!this.state.noteFolderIdValid} 
                            validationMessage={this.state.validationMessages.noteFolderIdMessage}
                        />
                    </label>

                    <label className='note-form-label' htmlFor='noteContent'>
                        Please enter the content for your note:
                        <textarea 
                            name="noteContent" 
                            id="noteContent" 
                            aria-required='true'
                            aria-label='Content for the new note'
                            aria-describedby='note-content-error'
                            ref={this.noteContentRef}
                            className='note-input'
                            onChange={e => this.updateNoteContent(e.target.value)} />
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            errorName="note-content-error"
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

