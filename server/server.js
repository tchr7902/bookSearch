import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { connectToDatabase } from './config/connection.js';

async function startApolloServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;

  // Connect to MongoDB database
  await connectToDatabase();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add context data here if needed (e.g., user authentication)
      return {
        user: req.user // Assuming you're using authentication middleware to populate req.user
      };
    }
  });

  // Start the Apollo Server
  await server.start();

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL playground at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
