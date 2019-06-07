import React from 'react';
import NotefulContext from './NotefulContext';
import "../css/NoteSidebar.css"

export default class NoteSidebar extends React.Component {

    static contextType = NotefulContext;
    
    render() {

        const getFolderName = () => {
            const thisNote = this.context.notes.find(note => note.id === this.props.match.params.noteId);
            const thisFolder = this.context.folders.find(folder => folder.id === thisNote.folderId);
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