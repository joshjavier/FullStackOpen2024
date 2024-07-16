import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Author, Book } from "./models/index.js"
import './db.js'

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.estimatedDocumentCount(),
    authorCount: async () => Author.estimatedDocumentCount(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) filter['author'] = author.id
      }
      if (args.genre) filter['genres'] = args.genre

      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (author) =>
      Book.countDocuments({ author: author.id })
  },
  Mutation: {
    addBook: async (root, args) => {
      // add the author to the system if not yet added
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const newBook = new Book({ ...args, author: author.id })
      await newBook.save()
      return newBook.populate('author')
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author)
        return

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`Server ready at ${url}`)
