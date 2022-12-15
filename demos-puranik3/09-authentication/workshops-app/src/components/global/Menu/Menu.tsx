import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuthentication } from '../../../services/auth';

const Menu = () => {
    const { push } = useHistory();

    const { email, role, logout } = useAuthentication();

    const doLogout = () => {
        logout();
        push( '/login' );
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                    activeClassName="active"
                    exact
                >
                    Workshops App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            activeClassName="active"
                            exact
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/workshops"
                            activeClassName="active"
                            exact
                        >
                            List of workshops
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/feedback"
                            activeClassName="active"
                            exact
                        >
                            Feedback
                        </Nav.Link>
                    </Nav>
                    {
                        email === '' ? (
                            <Nav
                                className="my-2 my-lg-0"
                            >
                                <Nav.Link
                                    as={NavLink}
                                    to="/login"
                                    activeClassName="active"
                                    exact
                                >
                                    Login
                                </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav
                                className="my-2 my-lg-0"
                            >
                                <Nav.Link
                                    onClick={doLogout}
                                >
                                    Logout
                                </Nav.Link>
                            </Nav>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
