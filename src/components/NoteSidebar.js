import React from 'react';
import "../css/NoteSidebar.css"

const NoteSidebar = (props) => (
    <nav className="nav">
        <button type='button' className="go-back-button" onClick={props.onClickGoBack}>
              Go back
        </button>

        <h2 className="folder-name">{props.folderName}</h2>
    </nav>
)

export default NoteSidebar;