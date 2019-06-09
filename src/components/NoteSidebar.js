import React from 'react';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';
import "../css/NoteSidebar.css"

export default class NoteSidebar extends React.Component {

    static contextType = NotefulContext;
    
    render() {

        const getFolderName = () => {
            const thisNote = this.context.notes.find(note => note.id === this.props.match.params.noteId) || '';
            const thisFolder = this.context.folders.find(folder => folder.id === thisNote.folderId) || '';
            return thisFolder.name;
        }

        const handleClickGoBack = () => {
            this.props.history.goBack();
        }


        return (
            <nav className="nav">
                <button type='button' className="go-back-button" onClick={handleClickGoBack}>
                    Go back
                </button>
                <h2 className="folder-name">{getFolderName()}</h2>
            </nav>
        )
    }
}

// Should I check the proptypes of notes and folders here as a prop?
// Even though they are coming from context, they really are props, yes?
NoteSidebar.propTypes = {
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
    }))
};