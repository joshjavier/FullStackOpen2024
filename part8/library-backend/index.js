import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"
import express from 'express'
import http from 'http'
import cors from 'cors'
import { makeExecutableSchema } from "@graphql-tools/schema"
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"
import jwt from 'jsonwebtoken'
import { User } from "./models/index.js"
import { typeDefs, resolvers } from "./schema.js"
import './db.js'

const schema = makeExecutableSchema({ typeDefs, resolvers })

// Set up http and websocket servers
const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
})
const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    },
  ],
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
