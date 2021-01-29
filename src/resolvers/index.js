// =========================
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
// Import my mutation module
// =========================
const { GrapgQLDateTime } = require('grapgql-iso-date');


module.exports = {
    Query,
    Mutation,
    DateTime: GrapgQLDateTime 
};