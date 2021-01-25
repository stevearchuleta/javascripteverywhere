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
// Run my server on a port that is either specified in my .env file or port 4000
// Dynamically sets the port in the Node .env environment or port 4000 when no port is specified
// =========================
const PORT = process.env.PORT || 4000;


// =========================
// GraphQL application schema
// This is GraphQL schema language
// =========================
const typeDefs = gql `
type Query {
    hello: String
}
`;


// =========================
// A necessary GraphQL resolver function for my schema fields; resolvers return a value to the user
// =========================
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};


// =========================
// Create an app object
// =========================
const app = express();


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
NOTE:   in terminal:  from the api-master directory, node src/index.js; ctrl c to cancel process
NOTE:   or... even better... npm run dev (this will enact the nodemon script in package.json)
*/