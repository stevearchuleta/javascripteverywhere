// =========================
// index.js 
// This is the main entry point of my notedly application 
// =========================


// =========================
// Express.js Framework 
// To build a server-side web app that will serve as the basis for the backend of my API
// =========================


// =========================
// Pass express dependency into the Node.js require method
// =========================
const express = require('express');


// =========================
// Pass apollo-server-express dependency to the Node.js require method; allows me to serve data as a GraphQL API
// =========================
const { ApolloServer, gql } = require('apollo-server-express');


// =========================
// Import .env configuration file
// =========================
require('dotenv').config();


// =========================
// Import db.js file
// =========================
const db = require('./db');


// =========================
// Run my server on a port that is either specified in my .env file or port 4000
// Dynamically sets the port in the Node .env environment or port 4000 when no port is specified
// =========================
const PORT = process.env.PORT || 4000;


// =========================
// Store DB_HOST value into its own variable
// =========================
const DB_HOST = process.env.DB_HOST;


// =========================
// An array of note objects, called notes, will be used as data that can be served by my API
// This is a temporary "in-memory" data representation that will eventually be replaced with a true database.
// =========================
let notes = [
    {id: '1', content: 'This is a note', author: "Steve Archuleta"},
    {id: '2', content: 'This is a anotehr note', author: "Randy Neely"},
    {id: '3', content: 'Oh hey look, yet another note', author: "Lorraine Archuleta"}
];


// =========================
// GraphQL Application Schema (its fundamental component is object type)
// This is GraphQL schema language
// Herein, I created a GraphQL object type of Note and a GraphQL object of type Query -- these could be named Pizza or Car or User
// The GraphQL object type Note is instructed to return scalar types of ID and String (NOTE: GraphQL language contains the following 5 scalar types: String, Boolean, Int, Float, and ID); the ! denotes field values that GraphQL must return, they're non-nullable.
// The GraphQL object type Query is instructed to return scalar type of String, array type of [Note], and/or a single Note based on a specific id value
// =========================
const typeDefs = gql `
type Note {
    id: ID!
    content: String!
    author: String!
}
type Query {
    hello: String
    notes: [Note!]!
    note(id:ID!): Note!
}
type Mutation {
    newNote(content: String!): Note!
}
`;


// =========================
// A necessary GraphQL resolver function for my schema fields; resolvers return a value, or an array of values, or a specified value to the user
// =========================
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id)
        }
    },
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: "Manuel Archuleta"
            };
            notes.push(noteValue);
            return noteValue; 
        }
    }
};


// =========================
// Create an app object
// =========================
const app = express();


// =========================
// Call MongoDB connection
// =========================
db.connect(DB_HOST);


// =========================
// Apollo Server Setup
// =========================
const server = new ApolloServer({ typeDefs, resolvers });


// =========================
//  Apply GraphQL Middleware (...and set path to /api)
// =========================
server.applyMiddleware({ app, path: '/api' });


// =========================
// Make my app locally available on port 400 http://localhost:4000
// Template leteral syntax
// =========================
app.listen(PORT, () => {
    console.log(
        `🌎  ==> GraphQL Server (The GraphQL Playground) is now running at http://localhost:${PORT}${server.graphqlPath}`
    ) 
}); 


/*
NOTE:   do not forget to 'run' this app in the terminal before accessing localhost:4000
NOTE:   in terminal:  from the notedly root directory, node src/index.js; ctrl c to cancel process
NOTE:   or... even better... npm run dev (this will enact the nodemon script in package.json)
*/