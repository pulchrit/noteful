import React from 'react';
import PropTypes from 'prop-types';
import "../css/NoteDetail.css";

const NoteDetail = (props) => (
    <section>
        <p className="note-content">{props.content}</p>
    </section>
)

export default NoteDetail;

NoteDetail.propTypes = {
    content: PropTypes.string
};