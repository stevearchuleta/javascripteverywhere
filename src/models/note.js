// =========================
// Create a Mongoose schema
// =========================

// =========================
// Require the mongoose library
// =========================
const mongoose = require('mongoose');


// =========================
// Define the/a note's database schema
// Define schema within the noteSchema variable
// This is a hadcoded temporary string representing the author
// =========================
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        // =========================
        // Assigns createdAt and updateAt fields with a Date type
        // =========================
        timestamps: true
    }
);


// =========================
// Define the 'Note' model with schema ('Note' is the model name)
// =========================
const Note = mongoose.model('Note', noteSchema);


// =========================
// Export this module
// =========================
module.exports = Note;

