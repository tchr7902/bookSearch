// Define the GraphQL query as a plain string
const GET_ME = `
  query me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// Export the query string
export { GET_ME };
