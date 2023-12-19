import React from 'react'
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar expand="lg" variant='dark' bg="black">
        <Container fluid>
          <Navbar.Brand>
            <img 
              width={100}
              src="https://variety.com/wp-content/uploads/2019/02/netflix-logo-originals.jpg?w=640"
              alt="logo"
              onClick={ () => navigate('/')}
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px',color:'white' }}
              navbarScroll
            >
              <Link to="/" className="nav_item text-decoration-none text-reset">Movies</Link>
              {/* <Link to="/myContents" className="nav_item text-decoration-none text-reset">MyContents</Link> */}
            </Nav>
            <Form className="d-flex">
              <FontAwesomeIcon icon={faSearch} 
                style={{fontSize: "50px",color: "white"}}
                onClick={() => navigate('/search')}
                />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>      

    </div>
  )
}
