// =========================
// db.js 
// MongoDB database connection code
// Connect my notedly app to my database 
// =========================


// =========================
// Require the Mongoose Library
// The Mongoose Object Document Mapper (ODM) is a schema-based modeling library that simplifies working with MongoDB in a Node.js environment 
// =========================
const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {

        // =========================
        // Use the Mongo driver's updated URL string parser
        // ========================= 
        mongoose.set('useNewUrlParser', true);


        // =========================
        // Use findOneAndUpdate() in place of findAndModify()
        // ========================= 
        mongoose.set('useFindAndModify', false);


        // =========================
        // Use createIndex() in place of ensureIndex()
        // ========================= 
        mongoose.set('useCreateIndex', true);


        // =========================
        // Use the new server discovery and monitoring engine
        // ========================= 
        mongoose.set('useUnifiedTopology', true);


        // =========================
        // Connect to the DB
        // ========================= 
        mongoose.connect(DB_HOST);


        // =========================
        // Log an error if connection fails
        // ========================= 
        mongoose.connection.on('error', err => {
            console.log(err);
            console.log('MongoDB connection error; Please ensure that MongoDB is running.');
            process.exit();
        });
    },

    close: () => {
        mongoose.connection.close();
    }
};