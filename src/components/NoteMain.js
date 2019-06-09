import React from 'react';
import NoteItem from './NoteItem';
import NoteDetail from './NoteDetail';
import NotefulContext from './NotefulContext';
import NotefulError from './NotefulError';
import PropTypes from 'prop-types';
import '../css/NoteMain.css';


class NoteMain extends React.Component {

    static contextType = NotefulContext;
    
    render() {
        
            const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
            console.log('note object:', note);

            return (
            <NotefulError>
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
            </NotefulError> 
            );
            
    } 
}

export default NoteMain;

// Use Proptypes to check context props?
NoteMain.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.string,
        folderId: PropTypes.string,
        content:PropTypes.string
    }))
};
