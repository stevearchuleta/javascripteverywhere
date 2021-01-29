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
const { ApolloServer } = require('apollo-server-express');


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
// Import schema file
// The script for my gql schema is written in the schema.js file 
// This external gql schema file must be imported as typeDefs, which will be passed as an argument into a new instance of ApolloServer (below)
// Import resolvers file
// The script for my GraphQL resolvers (mutations and queries) is written in the resolvers.js file
// This external GraphQL resolvers file must be imported as resolvers, which will be passed as an argument into a new instance of ApolloServer (below)
// =========================
const typeDefs = require('./schema')
const resolvers = require('./resolvers');


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
// Create an app object
// =========================
const app = express();


// =========================
// Call MongoDB connection
// =========================
db.connect(DB_HOST);


// =========================
// Apollo Server Setup
// A necessary reference to the GraphQL schema (in the schema.js file that was imprted into this file)
// A necessary reference to the GraphQL resolver functions (in the resolvers folder) for all of my schema fields; 
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions MongoDB model's create() method, find() method, findById() method 
// The context function returns my database models by adding the db to the contex
// =========================
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => {
        return { models }
    }
});


// =========================
// Apply GraphQL Middleware (...and set path to /api)
// Therefore, because of the app.listen() method below, when I run this server, the app express() object will be available at http://localhost:4000/api
// =========================
server.applyMiddleware({ app, path: '/api' });


// =========================
// Make my app locally available on port 400 http://localhost:4000
// Template leteral syntax (is a template string that allows for a JS embedded exression, such as: ${...})
// =========================
app.listen(PORT, () => {
    console.log(
        `🌎  ==> GraphQL Server (The GraphQL Playground) is now running at http://localhost:${PORT}${server.graphqlPath}`
    ) 
}); 


/*
NOTE:   do not forget to 'run' this app in the terminal before accessing localhost:4000
NOTE:   in terminal:  from the notedly root directory, node src/index.js; ctrl c to cancel process
NOTE:   OR... EVEN BETTER... npm run dev (this will enact the nodemon script in package.json)
*/