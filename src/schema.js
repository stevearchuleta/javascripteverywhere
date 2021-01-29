// =========================
// Pass apollo-server-express dependency to the Node.js require method; allows me to serve data as a GraphQL API
// =========================
const { gql } = require('apollo-server-express');


// =========================
// GraphQL Application Schema (its fundamental component is object type)
// This is GraphQL schema language
// Herein, I created a GraphQL object type of Note and a GraphQL object of type Query -- these could be named Pizza or Car or User
// The GraphQL object type Note is instructed to return scalar types of ID and String (NOTE: GraphQL language contains the following 5 scalar types: String, Boolean, Int, Float, and ID); the ! denotes field values that GraphQL must return, they're non-nullable.
// The GraphQL object type Query is instructed to return scalar type of String, array type of [Note], and/or a single Note based on a specific id value
// The GraphQL object type Mutation is instructed to return a Note
// =========================
module.exports = gql `
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
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Note!
}
`;