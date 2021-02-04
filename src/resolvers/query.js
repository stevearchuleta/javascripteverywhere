// =========================
// Resolver Code Performs A Database Lookup For INFO/DATA
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions:
// MongoDB model's create() method, find() method, findById() method 
// =========================


module.exports = { 
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    },
    user: async (parent, { username }, { models }) => {
        return await models.User.findOne({ username });
    },
    users: async (parent, args, { models }) => {
        return await models.User.find({});
    },
    me: async (parent, args, { models, user }) => {
        return await models.User.findById(user.id)
    },
    noteFeed: async (parent, { cursor }, { models }) => {


        // =========================
        // Hardcode the cursor-based pagination limit to 10 items
        // =========================
        const limit = 10;


        // =========================
        // Set the default hasNextPage value to false
        // =========================
        let hasNextPage = false;


        // =========================
        // If no cursor is passed as an argument, then the default query will remain empty; this will pull the newest notes from the database
        // =========================
        let cursorQuery = {};


        // =========================
        // If a cursor is passed as an argument, my query will search for notes with an ObjectId less that that of the cursor
        // lt means less than, in the MongoDB query language
        // =========================
        if (cursor) {
            cursorQuery = { _id: { $lt: cursor } }
        }


        // =========================
        // Find the 'limit plus one' of notes in my database and sort newest to oldest
        // =========================
        let notes = await models.Note.find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);


        // =========================
        // If the number of notes I find exceeds my limit
        // =========================
        if ( notes.length > limit ) {
            hasNextPage = true;
            notes = notes.slice(0, -1);
        }


        // =========================
        // The new cursor will be the Mongo Object ID of the last item in the feed array
        // recall: 0th index = notes[0]; last index = notes[notes.length - 1]
        // =========================
        const newCursor = notes[notes.length - 1]._id;


        return {
            notes, 
            cursor: newCursor, 
            hasNextPage
        }
    }
}