import React from 'react';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
//import uuidv4 from 'uuid/v4';
//import PropTypes from 'prop-types';
import "../css/AddFolder.css";

export default class AddFolder extends React.Component {

    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.state = {
            //folderId: '',
            folderName: '',
            folderNameValid: false,
            addFolderFormValid: false,
            validationMessages: {
                folderNameMessage: '',
            },
            error: null
        }
        this.folderNameRef = React.createRef();
    }

    updateFolderName(folderName) {
        this.setState({folderName}, () => {this.validateFolderName(folderName)});
    }

    validateFolderName(folderName) {
        // Make a copy of the validationMessages from state so that 
        // you can change the folderName message and pass the full
        // validationMessages object back into state.
        let errorMessages = {...this.state.validationMessages};

        let notValid = false;

        // Trim any white space added by the user.
        folderName = folderName.trim(); 

        // Determine if this folder name is already in use. 
        const nameTaken = this.context.folders.find(folder => 
            folder.folder_name === folderName);

        const passFocusOnError = (refName) => {
            refName.current.focus();
        }

        // Ensure user has entered something for the name. This is sort of doubly 
        // verified because the Save button is also disabled until the user enters something.
        if (folderName.length === 0) {
            passFocusOnError(this.folderNameRef);
            errorMessages.folderNameMessage = "Please enter a folder name.";
            notValid = true;
        } else if (nameTaken !== undefined) {
            passFocusOnError(this.folderNameRef);
            errorMessages.folderNameMessage = "This folder name is already in use. Please enter a different name.";
            notValid = true;
        } else {
            errorMessages = '';
            notValid = false;
        }

        this.setState({
            validationMessages: errorMessages,
            folderNameValid: !notValid
        }, this.setFormValid) //formValid is a callback function that will be executed after entire form as been updated.

    }

    setFormValid() {
        this.setState({
            // If individual user inputs are all valid, then the form is valid.
            // You have to run this as a separate function because setState doesn't always
            // update immediately after being called. So, checking all of the input states
            // in this separate callback will ensure all previous setState() have executed. 
            addFolderFormValid: this.state.folderNameValid
        });
    }

    handleSubmitFolder(event) {
        event.preventDefault();

        // TAKE THIS apart. WE don't need uuid... so handle
        //const folderId = uuidv4();
        //this.setState({folderId}, this.updateAPIandContext);

    //}
    
    //updateAPIandContext() {

        const folder = {
            //id: this.state.folderId,
            folder_name: this.state.folderName
        };

        this.setState({ error: null });

        fetch(`https://mysterious-citadel-85217.herokuapp.com/api/folders`, {
          method: 'POST',
          body: JSON.stringify(folder),
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
                folderName: '',
            });
            this.props.history.goBack();
            this.context.addFolder(data);
          })
          .catch(error => {
            this.setState({error});
          })
    };
    
    render() {

        return (
            <section className="add-folder-section">
                <h2 className='add-form-title'>Add a folder</h2>
                
                {/* If there is no API error, this will render as an empty <div></div>.*/}
                <div className='add-folder-error' role='alert'>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </div>

                <form className='add-folder-form' onSubmit={(event) => this.handleSubmitFolder(event)}>
                    <label className='folder-name-label' htmlFor='folderName'>
                        Please enter a name for your folder:
                        <input 
                            type='text' 
                            name='folderName' 
                            id='folderName' 
                            aria-required='true'
                            aria-label='Name for the new folder'
                            aria-describedby='folder-name-error'
                            ref={this.folderNameRef}
                            className='folder-name-input'
                            onChange={e => this.updateFolderName(e.target.value)} />
                        {/* If there's an error, a message will render in a <div>. If no error
                            an empty element will render. */}
                        <ValidationError 
                            errorName="folder-name-error"
                            notValid={!this.state.folderNameValid} 
                            validationMessage={this.state.validationMessages.folderNameMessage}
                        />
                    </label>

                    <button type='submit' className='add-folder-submit-button'
                        disabled={!this.state.addFolderFormValid}>
                            Save
                    </button>
                </form>
            </section>
        ); 
    }
}

