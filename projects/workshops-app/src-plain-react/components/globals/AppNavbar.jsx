import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand to="/" as={NavLink}>Workshops App</Navbar.Brand>
                <Nav className="me-auto">
                    {/* NavLink gives a className 'active' to the active link (i.e. a link whose to prop value matches the current URL). Bootstrap has a CSS class called 'active' that is used to highlight a link in the navbar */}
                    <Nav.Link to="/" as={NavLink} exact>Home</Nav.Link>
                    <Nav.Link to="/workshops" as={NavLink} exact>Workshops</Nav.Link>
                    <Nav.Link to="/workshops/add" as={NavLink} exact>Add a workshop</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;