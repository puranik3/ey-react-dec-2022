import React from 'react';

function About(props) {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Workshops App</h1>
            <hr className="my-2" />
            <p className="lead">
                View details of workshops happening around you, and vote on sessions. You can check out workshops <a href="/workshops">here</a>.
            </p>
        </div>
    );
}

export default About;