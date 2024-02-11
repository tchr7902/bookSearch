import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from "../../../server/schemas/mutations";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = async () => {
    // Perform search and update searchResults state
  };

  const handleSaveBook = async (bookId) => {
    try {
      await saveBook({
        variables: { bookData: { bookId } }
      });
      // Add logic to update state or display message on success
    } catch (error) {
      console.error(error);
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
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          {/* Add additional book details as needed */}
          <button onClick={() => handleSaveBook(book.bookId)}>Save</button>
        </div>
      ))}
    </div>
  );
};

export default SearchBooks;
