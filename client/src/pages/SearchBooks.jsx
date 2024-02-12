import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from "../../../server/schemas/mutations";
import '../App.css';

const SearchBooks = ({ searchTerm, searchResults, setSearchResults }) => {
  const [saveBookMutation] = useMutation(SAVE_BOOK);
  const [expandedBookId, setExpandedBookId] = useState(null); // State to track expanded book ID

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
          setSearchResults(response.data.items || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();

  }, [searchTerm, setSearchResults]);

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
        }
      });
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const toggleDescription = (bookId) => {
    setExpandedBookId(expandedBookId === bookId ? null : bookId);
  };

  return (
    <div className="search-results">
      {/* Render search results if available */}
      {searchResults && searchResults.map((book) => (
        <div key={book.id} className="search-card">
          <h3 className="book-title">{book.volumeInfo.title}</h3>
          <p className="book-authors"><strong>Authors:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</p>
          {/* Collapsible description */}
          <div className="book-description">
            <strong>Description:</strong>
            {expandedBookId === book.id ? (
              <>
                <p>{book.volumeInfo.description ? book.volumeInfo.description : 'N/A'}</p>
                <button className="toggle-description" onClick={() => toggleDescription(book.id)}>Show Less</button>
              </>
            ) : (
              <button className="toggle-description" onClick={() => toggleDescription(book.id)}>Show More</button>
            )}
          </div>
          {/* End collapsible description */}
          {book.volumeInfo.imageLinks && <img className="book-image" src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />}
          <a className="book-link" href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
          <button className="save-button" onClick={() => handleSaveBook(book)}>Save</button>
        </div>
      ))}
    </div>
  );
};

export default SearchBooks;
