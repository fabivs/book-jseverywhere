import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import db from './db.js'
import models from './models/index.js'

const port = process.env.PORT || 4000;
const db_host = process.env.DB_HOST;

// GraphQL schema
const typeDefs = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Query {
        notes: [Note!]!
        note(id: ID!): Note
    }

    type Mutation {
        newNote(content: String!): Note!
    }
`;

// GraphQL resolvers
const resolvers = {
    Query: {
        notes: async () => { return await models.Note.find(); },
        note: (_parent, args) => {
            return notes.find(note => note.id == args.id)
        }
    },
    Mutation: {
        newNote: async (_parent, args) => {
            return await models.Note.create({
                author: 'Adam Scott',
                content: args.content
            })
        }
    }
};

const app = express();

db.connect(db_host);

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath} ...`));