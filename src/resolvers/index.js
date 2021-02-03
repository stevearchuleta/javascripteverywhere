// =========================
// Resolver Code Performs A Database Lookup For INFO/DATA
// Use an index.js file in the resolvers folder to import all of my mutations and queries into my Apollo Server Express application
// Herein, I combine all of my resolvers (Mutations and Queries) into a single JavaScript module (for export)
// =========================


// =========================
// Import my query module
// =========================
const Query = require('./query');


// =========================
// Import my mutation module
// =========================
const Mutation = require('./mutation');


// =========================
// Import my note module
// =========================
const Note = require('./note');


// =========================
// Import my user module
// =========================
const User = require('./user');


// =========================
// Import graphql-iso-date package
// =========================
const { GraphQLDateTime } = require('graphql-iso-date');


module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime 
};