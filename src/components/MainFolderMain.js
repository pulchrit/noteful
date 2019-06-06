import React from 'react';
import NoteItem from './NoteItem';
import {Link} from 'react-router-dom';
import NotefulContext from './NotefulContext';
import "../css/MainFolderMain.css";

export default class MainFolderMain extends React.Component {
    
    static contextType = NotefulContext;

    render() {
        
       /*  function determineFolderOrMain(props) {
            
            // If main route, return all notes. 
            if (props.match.path === '/') {
                const {notes} = this.context.data;
                return {notes};
            } else {
                // If folder route, return only notes for this folder.
                const notes = this.context.data.notes.reduce((selectedNotes, currentNote) => {
                    if (currentNote.folderId === props.match.params.folderId) {
                    selectedNotes.push(currentNote)
                    }
                    return selectedNotes;
                }, []);
                return notes;
            }
        } */

        let notes;

        if (this.props.match.path === '/') {
            notes = this.context.data.notes;
        } else {
            notes = this.context.data.notes.reduce((selectedNotes, currentNote) => {
                if (currentNote.folderId === this.props.match.params.folderId) {
                selectedNotes.push(currentNote)
                }
                return selectedNotes;
            }, []);
        }
 
        return (
            
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
        );
    }
}

