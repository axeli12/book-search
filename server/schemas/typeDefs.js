const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String! @unique
    email: String! @unique
    password: String!
    savedBooks: [Book]
}

type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Query {
    users: [User]
    books: [Book]
    user(username: String!): User
}
`;

module.exports = typeDefs;