import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const port = process.env.PORT || 4000;

// TEMPORARY data to test out the API
let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Remo Labarca' },
    { id: '3', content: 'Yet another note', author: 'Giulio Cesare' }
];

// GraphQL schema
const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        hello: String!
        note(id: ID!): Note
    }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        note: (parent, args) => {
            return notes.find(note => note.id == args.id)
        }
    }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath} ...`));