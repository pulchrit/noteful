import React from 'react';
import {NavLink} from 'react-router-dom';
import "../css/MainFolderSidebar.css";

const MainFolderSidebar = (props) => (

    <ul className="folder-list">
        {props.folders.map(folder => 
           <li key={folder.id} className="unselected-folder">
                <NavLink 
                    to={`/folder/${folder.id}`}
                    activeClassName='selected-folder'
                >
                    {folder.name}
                </NavLink>
            </li>
        )}
        
    </ul>
);

export default MainFolderSidebar;