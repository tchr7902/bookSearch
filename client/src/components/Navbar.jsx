import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Form, Button } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SearchBooks from '../pages/SearchBooks';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from "../../../server/schemas/mutations";
import Auth from '../utils/auth'; // Import Auth for token handling
import '../App.css'; // Import custom styles
import axios from 'axios';

const NavbarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false); // State to track whether search button is clicked
  const [saveBookMutation] = useMutation(SAVE_BOOK);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (searchTerm.trim()) {
      // Perform search functionality here
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        setSearchResults(response.data.items || []);
        setSearchClicked(true); // Set searchClicked to true when search button is clicked
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleSaveBook = async (book) => {
    try {
      await saveBookMutation({
        variables: {
          bookData: {
            bookId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink
          }
        },
        context: { headers: { Authorization: `Bearer ${Auth.getToken()}` }} // Add token to the mutation context
      });
    } catch (error) {
      console.error('Error saving book:', error);
    }
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
              <Form inline="true" onSubmit={handleSearch} className="search-form">
                <Form.Control
                  type="text"
                  placeholder="Search books"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Button variant="outline-light" type="submit" className="search-button">Search</Button>
              </Form>
              <Nav.Link as={Link} to='/saved' className="nav-link">Saved Books</Nav.Link>
              <Nav.Link onClick={() => setShowModal(true)} className="nav-link">Login/Sign Up</Nav.Link>
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
      {/* Conditionally render SearchBooks component based on whether search button is clicked */}
      {searchClicked && <SearchBooks searchTerm={searchTerm} searchResults={searchResults} />}
    </>
  );
};

export default NavbarComponent;
