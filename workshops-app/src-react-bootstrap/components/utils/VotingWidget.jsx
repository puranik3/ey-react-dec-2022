import React from 'react';
import PropTypes from 'prop-types';

import { VotingButton } from './VotingWidget.css';

const VotingWidget = ({ upvoteCount, upvote, downvote }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <VotingButton className="fa fa-caret-up" onClick={upvote}></VotingButton>
            <span>{upvoteCount}</span>
            <VotingButton className="fa fa-caret-down" onClick={downvote}></VotingButton>
        </div>
    );
};

VotingWidget.propTypes = {
    upvoteCount: PropTypes.number.isRequired,
    upvote: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired
};

export default VotingWidget;