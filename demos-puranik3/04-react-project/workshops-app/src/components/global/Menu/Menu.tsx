import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";

const Menu = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/" as={NavLink} activeClassName="active" exact>Workshops App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link to="/" as={NavLink} activeClassName="active" exact>Home</Nav.Link>
                        <Nav.Link to="/workshops" as={NavLink} activeClassName="active" exact>List of workshops</Nav.Link>
                        <Nav.Link to="/feedback" as={NavLink} activeClassName="active" exact>Feedback</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
