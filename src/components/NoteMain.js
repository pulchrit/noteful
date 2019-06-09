import React from 'react';
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
import '../css/NoteMain.css';


class NoteMain extends React.Component {

    static contextType = NotefulContext;
    
    render() {
        <NotefulError>
            const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
            console.log('note object:', note);

            return (
                <main className="main">
                    <NoteItem 
                            key={note.id}
                            noteId={note.id}
                            name={note.name}
                            modified={note.modified}
                            folderId={note.folderId} 
                    />

                    <NoteDetail 
                        content={note.content}
                    />
                </main>
            );
        </NotefulError> 
    } 
}

export default NoteMain;

