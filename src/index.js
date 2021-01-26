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
// The script for my gql schema is written in the schema.js file 
// This external gql schema must be imported as typeDefs, which will be passed as an argument to a new instance of ApolloServer (below) 
// =========================
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema')

// =========================
// Import .env configuration file
// =========================
require('dotenv').config();


// =========================
// Import db.js file
// =========================
const db = require('./db');


// =========================
// Import my all of my database model codes 
// This is made possible by the export.modules object in my models index.js file
// =========================
const models = require('./models');


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
// A necessary GraphQL resolver function for my schema fields; 
// Resolvers can Mutate or... return a value, or an array of values, or a specified value to the user via Queries
// MongoDB model's create() method, find() method, findById() method 
// =========================
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: async () => {
            return await models.Note.find()
        },
        note: async (parent, args) => {
            return await models.Note.findById(args.id);
        }
    },
    Mutation: {
        newNote: async (parent, args) => {
            return await models.Note.create({
                content: args.content,
                author: "Steve Archuleta"
            });
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
// Apply GraphQL Middleware (...and set path to /api)
// Therefore, because of the app.listen() method below, when I run this server, the app express() object will be available at http://localhost:4000/api
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