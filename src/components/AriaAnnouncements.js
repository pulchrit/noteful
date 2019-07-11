import React from 'react';
import '../css/AriaAnnouncements.css';

export default class AriaAnnoucements extends React.Component {
    render() {
        return (
            <div aria-live='polite' aria-atomic='true' className='visually-hidden'>
                {this.props.ariaMessage}
            </div>
        );
    }
}