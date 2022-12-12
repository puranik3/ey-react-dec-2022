import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from "react-bootstrap";
// useSelector helps get any part of the global state from store
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../store';
import {
    toggleTheme
} from '../../../actions/creators';

const Menu = () => {
    const dispatch = useDispatch();
    const theme = useSelector<State>( state => state.theme.value );

    return (
        <Navbar bg={theme as string} variant={theme as string} expand="lg">
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
                    <Nav
                        className="my-2 my-lg-0"
                    >
                        <Button
                            variant="info"
                            onClick={() => dispatch( toggleTheme() )}
                        >
                            Change theme
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
