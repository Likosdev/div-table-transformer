import { Router, useRouter } from 'next/router';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import NavDropdown from 'react-bootstrap/NavDropdown';



const Navigation = () => {
  const basePath = useRouter().basePath
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href={basePath}>LFR Tools</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={basePath}>Home</Nav.Link>
            {/* <Nav.Link href="/About">About</Nav.Link> */}
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <NavDropdown.Item href={basePath + "/Tools/KeywordCounter"}>
                Keyword Counter
              </NavDropdown.Item>
              <NavDropdown.Item href={basePath + "/Tools/TableConverter"}>
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