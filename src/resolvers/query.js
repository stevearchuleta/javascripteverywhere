// =========================
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions MongoDB model's create() method, find() method, findById() method 
// =========================


module.exports = { 
    notes: async (parent, args, { models }) => {
        return await models.Note.find()
    },
    note: async (parent, args, { models }) => {
        return await models.Note.findById(args.id);
    }
}