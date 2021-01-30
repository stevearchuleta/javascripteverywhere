// =========================
// Use an index.js file in the models folder to import my models into my Apollo Server Express application
// Herein, I combine all of my models into a single JavaScript module (for export)
// =========================


// =========================
// Import my note module
// =========================
const Note = require('./note');
const User = require('./user');

const models = {
    Note,
    User
};

module.exports = models;