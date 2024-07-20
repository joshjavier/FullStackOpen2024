import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import cors from 'cors'
import http from 'http'
import express from 'express'
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import User from "./models/user.js"
import typeDefs from "./schema.js"
import resolvers from "./resolvers.js"

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  '/',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(auth.slice(7), process.env.SECRET)
        const currentUser = await User.findById(decodedToken.id).populate('friends')
        return { currentUser }
      }
    },
  }),
)

const PORT = process.env.PORT

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`)
})
