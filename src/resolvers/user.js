// =========================
// Resolver Code Performs A Database Lookup For INFO/DATA
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions:
// MongoDB model's create() method, find() method, findById() method 
// =========================

module.exports = {

    // =========================
    // Resolve the list of notes for a user when requested; sort in descending order
    // The user has a list of notes... so find that list
    // =========================
    notes: async (user, args, { models }) => {
        return await models.Note.find({ author: user.id }).sort({ _id: -1 });
    },
    // =========================
    // Resolve the list of favorites for a user when requested
    // The user has a list of favorites... so find that list
    // =========================
    favorites: async (user, args, { models }) => {
        return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
};