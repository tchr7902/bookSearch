// Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate
import { Navbar, Nav, Container, Modal, Tab, Form, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const NavbarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // State to track active tab
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`); // Using navigate instead of useHistory.push
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Form onSubmit={handleSearch} inline="true">
                <Form.Control
                  type="text"
                  placeholder="Search books"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-light" type="submit">Search</Button>
              </Form>
              <Nav.Link as={Link} to='/saved'>Saved Books</Nav.Link>
              <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='login-signup-modal'
      >
        <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
          <Modal.Header closeButton>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default NavbarComponent;
