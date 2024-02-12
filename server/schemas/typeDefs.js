import { gql } from '@apollo/client';

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book]!
        bookCount: Int
    }

    type Book {
        bookId: ID!
        authors: [String]!
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        searchBooks(searchTerm: String!): [Book]!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }

    input BookInput {
        bookId: ID!
        authors: [String]!
        description: String!
        title: String!
        image: String
        link: String
    }
`;

module.exports = typeDefs;
