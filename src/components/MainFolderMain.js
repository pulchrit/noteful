import React from 'react';
import NoteItem from './NoteItem';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
//import PropTypes from 'prop-types';
import "../css/MainFolderMain.css";

export default class MainFolderMain extends React.Component {
    
    static contextType = NotefulContext;

    render() {
       
        let notes;

        if (this.props.match.path === '/') {
            notes = this.context.notes;
        } else {
            notes = this.context.notes.filter(note => note.folder_id === Number.parseInt(this.props.match.params.folderId));
        }
        
        return (
            <NotefulError>
                <main className="main">
                    
                    {notes.map(note => 
                        <NoteItem 
                            key={note.id}
                            noteId={note.id}
                            name={note.note_name}
                            modified={note.date_modified}
                            folderId={note.folder_id}
                        />
                    )}

                    <Link to="/addNote" className="add-button">Add note</Link>
                </main>
            </NotefulError>
        );
    }
}

