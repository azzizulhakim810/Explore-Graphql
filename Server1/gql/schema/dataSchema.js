// The GraphQL schema
module.exports = `#graphql


extend type Query {
    getBooks: [Book]
  }

  input book {
    name: String
    author: String
    price: Int
  }

  input updateBookPriceInput {
    _id: ID
    price: Int
  }

  type Book {
    _id: ID
    name: String
    author: String
    price: Int
  }

  extend type Mutation {
    addBook(input:book!): Book
    updateBookPrice(input:updateBookPriceInput!): Book
    deleteBook(_id: ID!): Book
  }


`;
