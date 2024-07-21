import { GraphQLError } from "graphql"
import { PubSub } from "graphql-subscriptions"
import { Author, Book, User } from "./models/index.js"

const pubsub = new PubSub()

export const typeDefs = `
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

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

export const resolvers = {
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
    allGenres: async () => {
      const books = await Book.find({})
      const genres = new Set(books.reduce((genres, book) => genres.concat(book.genres), []))
      return Array.from(genres)
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (author) =>
      Book.countDocuments({ author: author.id })
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // logged in users only
      if (!currentUser) {
        throw new GraphQLError('Authentication failed', {
          extensions: { code: 'AUTH_FAILED' }
        })
      }

      try {
        // add the author to the system if not yet added
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const newBook = new Book({ ...args, author: author.id })
        await newBook.save()
        const savedBook = await newBook.populate('author')

        // Notify subscribers of the new book
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

        return savedBook
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
    editAuthor: async (root, args, { currentUser }) => {
      // logged in users only
      if (!currentUser) {
        throw new GraphQLError('Authentication failed', {
          extensions: { code: 'AUTH_FAILED' }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, { username, favoriteGenre }) => {
      try {
        const user = new User({ username, favoriteGenre })
        await user.save()
        return user
      } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          throw new GraphQLError('Username is already taken', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: 'username'
            }
          })
        }
      }
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const payload = {
        username: user.username,
        id: user.id,
      }

      return { value: jwt.sign(payload, process.env.SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}
