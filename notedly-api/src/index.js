import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const port = process.env.PORT || 4000;

// GraphQL schema
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath} ...`));