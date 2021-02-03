// =========================
// Resolver Code Performs A Database Lookup For INFO/DATA
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions:
// MongoDB model's create() method, find() method, findById() method 
// =========================

module.exports = {

    // =========================
    // Resolve the author information for a note when requested
    // The note has an author... so find the author
    // =========================
    author: async (note, args, { models }) => {
        return await models.User.findById(note.author);
    },
    // =========================
    // Resolve the favoritedBy information for a note when requested
    // The note has been favoritedBy... so find by whom it was favoritedBy
    // =========================
    favoritedBy: async (note, args, { models }) => {
        return await models.User.find({ _id: { $in: note.favoritedBy } });
    }
}