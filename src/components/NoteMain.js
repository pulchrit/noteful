import React from 'react';
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import '../css/NoteMain.css';

const NoteMain = (props) => (
    <main className="main">
        <NoteItem 
                key={props.note.id}
                noteId={props.note.id}
                name={props.note.name}
                modified={props.note.modified}
                folderId={props.note.folderId}
        />

        <NoteDetail 
            content={props.note.content}
        />
    </main>
)

export default NoteMain;