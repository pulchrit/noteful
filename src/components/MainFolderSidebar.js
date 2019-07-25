import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import NotefulContext from "./NotefulContext";
//import PropTypes from 'prop-types';
import "../css/MainFolderSidebar.css";

export default class MainFolderSidebar extends React.Component {

    static contextType = NotefulContext;
    
    render() {
        const {folders} = this.context;
        //console.log('folders from content:', folders);

        return (
            <nav className="nav">
                <ul className="folder-list" aria-live="polite"> 
                    {folders.map(folder => 
                    <li key={folder.id}>
                            <NavLink 
                                to={`/folder/${folder.id}`}
                                className='folder'
                                activeClassName='selected-folder'
                            >
                                {folder.folder_name}
                            </NavLink>
                        </li>
                    )}
                    
                </ul>

                <Link to="/addFolder" className="add-button">Add folder</Link>
            </nav>
        );
    }
}

