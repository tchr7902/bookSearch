import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from "../../../server/schemas/mutations";
import { GET_ME } from "../../../server/schemas/queries";

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId }
      });
      // Add logic to update state or display message on success
    } catch (error) {
      console.error(error);
      // Add logic to handle error
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Render saved books here */}
      {data.me.savedBooks.map((book) => (
        <div key={book.bookId}>
          <h3>{book.title}</h3>
          {/* Add additional book details as needed */}
          <button onClick={() => handleDeleteBook(book.bookId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default SavedBooks;
