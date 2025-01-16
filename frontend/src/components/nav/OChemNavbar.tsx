import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OChemNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand as={Link} to="/">
          <img
            alt="OChem Reaction Predictor Logo"
            src={"/logo.png"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/product-predict">
              Predict
            </Nav.Link>
            <Nav.Link as={Link} to="/history">
              History
            </Nav.Link>
            <Nav.Link as={Link} to="/api-key">
              API Key
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
