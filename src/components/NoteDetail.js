import React from 'react';
import "../css/NoteDetail.css";

const NoteDetail = (props) => (
    <section>
        <p className="note-content">{props.content}</p>
    </section>
)

export default NoteDetail;