import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to="/">Home</Link>
                <Link className="nav-item nav-link" to="/workshops">Workshops</Link>
            </div>
        </nav>
    );
}

export default Navbar;