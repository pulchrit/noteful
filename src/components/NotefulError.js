import React from 'react';

export default class NotefulError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className='boundary-error-ui'>
                    <h2>Apologies. Something has gone quite wrong.</h2>
                    <p>Please do <a href='mailto:pulchrit@gmail.com'>let us know</a> 
                        about this terrible inconvenience. Thank you.
                    </p>
                </section>
            );
        }
        return this.props.children;
    }
}