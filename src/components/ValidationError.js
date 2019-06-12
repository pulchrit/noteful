import React from 'react';
import PropTypes from 'prop-types';
import '../css/ValidationError.css';

export default function ValidationError(props) {
    if (props.notValid) {
        return (
            <div 
                className='error-message' 
                id={props.errorName}
            >{props.validationMessage}
            </div>
        );
    }
    return <> </> // If no error, render an empty element.
}

ValidationError.propTypes = {
    notValid: PropTypes.bool,
    validationMessage: PropTypes.string
};