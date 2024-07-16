import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from "graphql"
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
        return [] // no books because author is not in the database
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
      try {
        // add the author to the system if not yet added
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const newBook = new Book({ ...args, author: author.id })
        await newBook.save()
        return newBook.populate('author')
      } catch (error) {
        if (error.name === 'ValidationError') {
          const path = Object.keys(error.errors)[0]
          const field = path === 'name' ? 'Author name' : 'Book title'
          throw new GraphQLError(`${field} is too short`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: path,
              errors: error.errors,
            }
          })
        } else {
          console.log(error)
        }
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      author.born = args.setBornTo
      return author.save()
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
