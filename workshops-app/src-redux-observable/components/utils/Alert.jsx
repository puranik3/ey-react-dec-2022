import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, theme }) => {
    return (
        <div className={`alert alert-${theme} alert-dismissible fade show`} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
            </button>
            <strong>{message}</strong>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string,
    theme: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
    ])
};

Alert.defaultProps = {
    theme: 'primary'
};

export default Alert;