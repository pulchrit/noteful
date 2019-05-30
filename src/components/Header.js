import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Header.css';

const Header = () => (
    
        <header className='header'>
            <h1>
            <Link to='/'>Noteful</Link>
            </h1>
        </header>

);

export default Header;

