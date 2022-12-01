import React from 'react';
import { Jumbotron } from 'react-bootstrap';

function About(props) {
    return (
        <Jumbotron>
            <h1 className="display-3">Workshops App</h1>
            <hr className="my-2" />
            <p className="lead">
                View details of workshops happening around you, and vote on sessions. You can check out workshops <a href="/workshops">here</a>.
            </p>
        </Jumbotron>
    );
}

export default About;