import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

import { verifyJWT } from './src/utils/auth.js';
import { resolvers } from './src/graphql/resolvers.js';
import { typeDefs } from './src/graphql/schema.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(
    'mongodb+srv://chetanbura:Ay0Li5uSgki9USFy@blogpost.ympzje6.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4500 },
      context: async ({ req, res }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || '';
        const jwt = verifyJWT(token);
        if (jwt) {
          return { authUserId: jwt.id, authUserEmail: jwt.email };
        }
        return null;
      },
    });
    console.log(`🚀  Server ready at: ${url}`);
  });
