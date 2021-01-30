// =========================
// Create a Mongoose user schema
// =========================

// =========================
// Require the mongoose library
// =========================
const mongoose = require('mongoose');

// =========================
// Define the/a user's database schema
// Define schema within the userSchema variable
// =========================
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true
            },
        avatar: {
            type: String
        }
    },
    {
        // =========================
        // This second object argument assigns createdAt and updatedAt fields to the mongoose UserSchema with a Data type 
        // =========================
        timestamps: true
    }
);

// =========================
// Define the 'User' model with userSchema ('User' is the model name)
// =========================
const User = mongoose.model('User', UserSchema);


// =========================
// Export this module
// =========================
module.exports = User;