import React from 'react';
import '../css/ValidationError.css';

export default function ValidationError(props) {
    if (props.notValid) {
        return (
            <div className='error-message'>{props.validationMessage}</div>
        );
    }
    return <> </> // If no error, render an empty element.
}