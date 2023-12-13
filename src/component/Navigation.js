import React from 'react'
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div>
      <Navbar expand="lg" variant='dark' bg="black">
        <Container fluid>
          <Navbar.Brand href="#">
            <img 
              width={100}
              src="https://variety.com/wp-content/uploads/2019/02/netflix-logo-originals.jpg?w=640"
              alt="logo"
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link to="/" className="nav_item">Home</Link>
              <Link to="movies" className="nav_item">Movies</Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="danger">Search</Button> */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>      

    </div>
  )
}
