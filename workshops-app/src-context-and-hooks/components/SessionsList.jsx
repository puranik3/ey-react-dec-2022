import React from 'react';
import PropTypes from 'prop-types';

import './SessionsList.css';

SessionsList.propTypes = {
    sessions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            workshopId: PropTypes.number,
            sequenceId: PropTypes.number,
            name: PropTypes.string,
            speaker: PropTypes.string,
            duration: PropTypes.number,
            level: PropTypes.oneOf( [ 'Basic', 'Intermediate', 'Advanced' ] ),
            abstract: PropTypes.string,
            upvoteCount: PropTypes.number
        })
    )
};

SessionsList.defaultProps = {
    sessions: []
};

function SessionsList( { sessions } ) {
    const getBadgeClass = level => ({
        'Basic': 'badge-success',
        'Intermediate': 'badge-info',
        'Advanced': 'badge-warning'
    }[level]);

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-12">
                    <h3>
                        Sessions in this workshop
                    </h3>
                    <hr />
                </div>
                <div className="col-12">
                    <ul className="list-group">
                        {
                            sessions.map( ( session, idx ) => (
                                <li className="list-group-item" key={session.id}>
                                    <div className="row">
                                        <div className="col-1">
                                            <div class="col-1">
                                                <div class="d-flex flex-column align-items-center">
                                                    <i class="fa fa-caret-up"></i>
                                                    <span>{session.upvoteCount}</span>
                                                    <i class="fa fa-caret-down"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-11">
                                            <div className="lead">{session.name}</div>
                                            <div className="h6">by {session.speaker}</div>
                                            <div>
                                                <span className={`badge ${getBadgeClass( session.level )}`}>{session.level}</span>
                                            </div>
                                            <div className="my-2">
                                                {session.duration} hours
                                            </div>
                                            <p>
                                                {session.abstract}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SessionsList;