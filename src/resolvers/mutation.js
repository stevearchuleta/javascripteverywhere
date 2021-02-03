// =========================
// Resolver Code Performs A Database Lookup For INFO/DATA
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions:
// MongoDB model's create() method, find() method, findById() method 
// =========================


// =========================
// Require the Mongoose Library
// The Mongoose Object Document Mapper (ODM) is a schema-based modeling library that simplifies working with MongoDB in a Node.js environment 
// Herein, the mongoose package will appropriately assign cross-referencing MongoDB object IDs to my fields. 
// =========================
const mongoose = require('mongoose');

// =========================
// Import all of the requred packages necessary to write my signUp mutation
// =========================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');





module.exports = {
    newNote: async (parent, args, { models, user }) => {
        
        
        // =========================
        // After adding the users context as a function parameter...
        // Then check if a user context actually exists for the newNote mutation; if not throw an error
        // Has the user been passed to the context?
        // Is the user the owner of the note?
        // =========================
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }

        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        })
    },
    deleteNote: async(parent, { id }, { models, user }) => {
        
        
        // =========================
        // After adding the users context as a function parameter...
        // Then check if a user context actually exists for the deleteNote mutation; if not throw an error
        // Has the user been passed to the context?
        // Is the user the owner of the note?
        // =========================
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note');
        }
        
        // =========================
        // Find the note
        // =========================
        const note = await models.Note.findById(id)


        // =========================
        // If the note owner and the current user do not match, then throw a forbidden error
        // =========================
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You do not have permission to delete this note.");
        }
        
        try {

        // =========================
        // If the note owner and the current user do match, then remove the note
        // =========================

            await note.remove();
            return true;
        }   catch (err) {

            // =========================
            // If an error occurs during the removal of the note, then return false
            // =========================    
            return false;
        }
    },
    updateNote: async(parent, { content, id }, { models, user }) => {
        
        
        // =========================
        // After adding the users context as a function parameter...
        // Then check if a user context actually exists for the deleteNote mutation; if not throw an error
        // Has the user been passed to the context?
        // Is the user the owner of the note?
        // =========================
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note');
        }
        

        // =========================
        // Find the note
        // =========================
        const note = await models.Note.findById(id)

        // =========================
        // If the note owner and the current user do not match, then throw a forbidden error
        // =========================
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You do not have permission to update this note.");
        }


        // =========================
        // Update the note in the database and return the updated note
        // =========================
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        )
    },
    signUp: async (parent, { username, email, password }, { models }) => {

        // =========================
        // Normalize email address
        // =========================
        email = email.trim().toLowerCase();

        // =========================
        // Hash the password
        // =========================
        const hashed = await bcrypt.hash(password, 10);

        // =========================
        // Create the gravatar url
        // =========================
        const avatar = gravatar(email);
        
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

        // =========================
        // Create and return the JsonWebToken
        // =========================
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        } catch (err) {
          console.log(err);

        // =========================
        // If there is a problem creating the account, throw an error
        // =========================
        throw new Error('There was an error creating this account.');

        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            
            // =========================
            // Normalize email address
            // =========================
            email = email.trim().toLowerCase();
        }
        
        const user = await models.User.findOne({
            $or: [{ username }, { password }]
        })

        // =========================
        // If no user is found, throw an authentication error
        // =========================
        if (!user) {
            throw new AuthenticationError('There was an error signing in');
        }
        
        // =========================
        // If the passwords do not match, throw an authentication error
        // =========================
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('There was an error signing in');
        }

         // =========================
        // Create and return the JsonWebToken
        // =========================
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        
        // =========================
        // If no user is found, throw an authentication error
        // =========================
        if (!user) {
            throw new AuthenticationError('There was an error signing in');
        }


        // =========================
        // Has the user already favorited this note? Check to see...
        // =========================
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);
        
        
        // =========================
        // If the user already exists in the favoriteCount list, remove them, then decrement favoriteCount by 1
        // =========================
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                // =========================
                // In order to return the updated document, set new to true
                // =========================
                new: true
                }
            );
        }   else {

            // =========================
            // If the user does not exists in the favoriteCount list, add them, then increment favoriteCount by 1
            // =========================
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                // =========================
                // In order to return the updated document, set new to true
                // =========================
                new: true
                }
            );
        }
    }
} 