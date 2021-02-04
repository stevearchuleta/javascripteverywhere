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
// Pass helmet dependency (protective middleware against common web vulnerabilities) into the Node.js require method
// =========================
const helmet = require('helmet');


// =========================
// Pass CORS dependency (cross origin resourse sharing) into the Node.js require method
// =========================
const cors = require('cors');


// =========================
// Pass graphql-depth-limit dependency into the Node.js require method
// =========================
const depthLimit = require('graphql-depth-limit');


// =========================
// Pass graphql-depth-limit dependency into the Node.js require method
// =========================
const { createComplexityLimitRule } = require('graphql-validation-complexity');


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
// Import jsonwebtoken module
// =========================
const jwt = require('jsonwebtoken');


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
// call helmet middleware function as an argument to expresses use() method 
// =========================
app.use(helmet());


// =========================
// call cors middleware function as an argument to expresses use() method; enable cross origin requests from all domains
// =========================
app.use(cors());


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
// Add the user to the resolver context, retrieve and verify the token from the header of the request, then add the user's info to the context.
// =========================
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        
        // =========================
        // Get the user token from the request headers
        // =========================
        const token = req.headers.authorization;


        // =========================
        // Try to retrieve a user with the token
        // =========================
        const user = getUser(token);

        //console.log(user);

        // =========================
        // Add the database models and the user to the context
        // =========================
        return { models, user }
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


// =========================
// Get the user information from the JWT
// =========================
const getUser = token => {
    if (token) {
        try {

            // =========================
            // Return the user information from the token
            // =========================
            return jwt.verify(token, process.env.JWT_SECRET);
        
        } catch (err) {

            // =========================
            // If there is a problem with the token, throw an error
            // =========================
            throw new Error('Session invalid')
        }
    }
};


/*
NOTE:   do not forget to 'run' this app in the terminal before accessing localhost:4000
NOTE:   in terminal:  from the notedly root directory, node src/index.js; ctrl c to cancel process
NOTE:   OR... EVEN BETTER... npm run dev (this will enact the nodemon script in package.json)
*/