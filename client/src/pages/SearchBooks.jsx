// SearchBooks.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { SAVE_BOOK } from "../../../server/schemas/mutations";

const SearchBooks = () => {
  const history = useHistory(); // Initialize useHistory
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = async () => {
    console.log('Before search');
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      console.log('Search results:', response.data.items);
      setSearchResults(response.data.items || []); // Update searchResults state with fetched data
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Add logic to handle error
    }
    console.log('After search');
  };
  

  const handleSaveBook = async (book) => {
    try {
      await saveBook({
        variables: {
          bookData: {
            bookId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink
          }
        }
      });
      // Add logic to update state or display message on success
    } catch (error) {
      console.error('Error saving book:', error);
      // Add logic to handle error
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Render search results here */}
      {searchResults.map((book) => (
        <div key={book.id}>
          <h3>{book.volumeInfo.title}</h3>
          <p><strong>Authors:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</p>
          <p><strong>Description:</strong> {book.volumeInfo.description ? book.volumeInfo.description : 'N/A'}</p>
          {book.volumeInfo.imageLinks && <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />}
          <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
          <button onClick={() => handleSaveBook(book)}>Save</button>
        </div>
      ))}
    </div>
  );
};

export default SearchBooks;
