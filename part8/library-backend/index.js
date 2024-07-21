import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from 'express'
import http from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { User } from "./models/index.js"
import { typeDefs, resolvers } from "./schema.js"
import './db.js'

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
      if (auth?.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(auth.slice(7), process.env.SECRET)
        const currentUser = await User.findOne({ username: decodedToken.username })
        return { currentUser }
      }
    }
  }),
)

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})
