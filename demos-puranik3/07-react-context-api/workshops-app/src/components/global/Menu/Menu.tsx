import { useTheme } from '../../../contexts/ThemeContext';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Menu = () => {
    const { theme, toggle } = useTheme();

    return (
        <Navbar bg={theme} variant={theme} expand="lg">
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
                        <Nav.Link>
                            <Button
                                variant="info"
                                onClick={() => toggle()}
                            >
                                Toggle theme
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
