import { gql } from "@apollo/client"

// Fragments

const CORE_BOOK_FIELDS = gql`
  fragment CoreBookFields on Book {
    id
    title
    author {
      name
    }
    published
  }
`

const ALL_BOOK_FIELDS = gql`
  fragment AllBookFields on Book {
    id
    title
    author {
      id
      name
      born
      bookCount
    }
    published
    genres
  }
`

// Queries

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  ${CORE_BOOK_FIELDS}
  query AllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...CoreBookFields
    }
  }
`

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres
  }
`

export const ADD_BOOK = gql`
  ${ALL_BOOK_FIELDS}
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...AllBookFields
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const RECOMMEND = gql`
  ${ALL_BOOK_FIELDS}
  query Recommend {
    me {
      favoriteGenre
    }
    allBooks {
      ...AllBookFields
    }
  }
`

export const BOOK_ADDED = gql`
  ${ALL_BOOK_FIELDS}
  subscription BookAdded {
    bookAdded {
      ...AllBookFields
    }
  }
`
