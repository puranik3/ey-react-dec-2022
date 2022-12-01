import React from 'react';

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/workshops">Workshops</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;