import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">LFR Tools</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/div-table-transformer">Home</Nav.Link>
            {/* <Nav.Link href="/About">About</Nav.Link> */}
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href="/div-table-transformer/Tools/KeywordCounter">
                Keyword Counter
              </NavDropdown.Item>
              <NavDropdown.Item href="/div-table-transformer/Tools/TableConverter">
                Table Converter
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  );
}

export default Navigation;