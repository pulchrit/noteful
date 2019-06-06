import React from 'react';
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import NotefulContext from './NotefulContext';
import {withRouter} from 'react-router-dom';
import '../css/NoteMain.css';

class NoteMain extends React.Component {

    static contextType = NotefulContext;

    /* render={ (routeProps) =>
                <NoteMain
                  note={this.state.notes.find(note => note.id === routeProps.match.params.noteId)}
                />
              } */
    
    render() {

        const note = this.context.data.notes.find(note => note.id === this.props.match.params.noteId);

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
    }  
}

export default withRouter(NoteMain);

