import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import "../css/MainFolderSidebar.css";

const MainFolderSidebar = (props) => (
    <nav className="nav">
        <ul className="folder-list">
            {props.folders.map(folder => 
            <li key={folder.id}>
                    <NavLink 
                        to={`/folder/${folder.id}`}
                        className='folder'
                        activeClassName='selected-folder'
                    >
                        {folder.name}
                    </NavLink>
                </li>
            )}
            
        </ul>

        <Link to="/addFolder" className="add-button">Add folder</Link>
    </nav>
)

export default MainFolderSidebar;