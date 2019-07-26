import React from 'react';
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
//import PropTypes from 'prop-types';
import '../css/NoteMain.css';


class NoteMain extends React.Component {

    static contextType = NotefulContext;

    
    
    render() {

            const note = this.context.notes.find(note => note.id === Number.parseInt(this.props.match.params.noteId));


            return (
            <NotefulError>
                <main className="main">
                    <NoteItem 
                            key={note.id}
                            noteId={note.id}
                            name={note.note_name}
                            modified={note.date_modified}
                            folderId={note.folder_id} 
                    />

                    <NoteDetail 
                        content={note.content}
                    />
                </main>
            </NotefulError> 
            );
            
    } 
}

export default NoteMain;


