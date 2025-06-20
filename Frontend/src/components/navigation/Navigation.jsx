import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <>
      <Navbar expand="lg" className="d-flex bg-warning">
        <Container>
          <Navbar.Brand
            className="d-flex justify-content-center fs-2 cursor-pointer"
            href="/"
          >
            EpiBlog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-center">
              <Nav.Link href="#home">Author</Nav.Link>
              <Nav.Link href="#link">Posts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
