// =========================
// Create a Mongoose note schema
// =========================

// =========================
// Require the mongoose library
// =========================
const mongoose = require('mongoose');


// =========================
// Define the/a note's database schema
// Define schema within the noteSchema variable
// =========================
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        // =========================
        // Assigns createdAt and updateAt fields with a Date type
        // =========================
        timestamps: true
    }
); 


// =========================
// Define the 'Note' model with noteSchema ('Note' is the model name)
// =========================
const Note = mongoose.model('Note', noteSchema);


// =========================
// Export this module
// =========================
module.exports = Note;

