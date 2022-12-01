import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Nav>
                <Nav.Link>
                    <NavLink className="nav-link" to="/" activeClassName="active" exact={true}>Home</NavLink>
                </Nav.Link>
                <Nav.Link className="nav-item">
                    <NavLink className="nav-link" to="/workshops" activeClassName="active" exact={true}>Workshops</NavLink>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;