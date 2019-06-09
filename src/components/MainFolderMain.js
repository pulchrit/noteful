import React from 'react';
import NoteItem from './NoteItem';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
import PropTypes from 'prop-types';
import "../css/MainFolderMain.css";

export default class MainFolderMain extends React.Component {
    
    static contextType = NotefulContext;

    render() {
       
        let notes;

        if (this.props.match.path === '/') {
            notes = this.context.notes;
        } else {
            notes = this.context.notes.reduce((selectedNotes, currentNote) => {
                if (currentNote.folderId === this.props.match.params.folderId) {
                selectedNotes.push(currentNote)
                }
                return selectedNotes;
            }, []);
        }
        
        return (
            <NotefulError>
                <main className="main">
                    
                    {notes.map(note => 
                        <NoteItem 
                            key={note.id}
                            noteId={note.id}
                            name={note.name}
                            modified={note.modified}
                            folderId={note.folderId}
                        />
                    )}

                    <Link to="/addNote" className="add-button">Add note</Link>
                </main>
            </NotefulError>
        );
    }
}

// Validate PropTypes on context? 
MainFolderMain.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.string,
        folderId: PropTypes.string,
        content:PropTypes.string
    }))
};