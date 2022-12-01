import React from 'react';
import { Link } from 'react-router-dom';

function About(props) {
    return (
        <div class="jumbotron">
            <h1 class="display-3">Workshops App</h1>
            <hr class="my-2" />
            <p class="lead">
                View details of workshops happening around you, and vote on sessions. You can check out workshops <Link to="/workshops">here</Link>.
            </p>
        </div>
    );
}

export default About;