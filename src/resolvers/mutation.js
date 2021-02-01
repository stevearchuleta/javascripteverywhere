// =========================
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions:
// MongoDB model's create() method, find() method, findById() method 
// =========================


// =========================
// Import all of the requred packages necessary to write my signUp mutation
// =========================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');


module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: "Steve Archuleta"
        })
    },
    deleteNote: async(parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        }   catch (err) {
        return false;
        }
    },
    updateNote: async(parent, { content, id }, { models }) => {
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
    }

} 