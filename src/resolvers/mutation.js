// =========================
// Resolvers can either Mutate, or... they return a value, or an array of values, or a specified value to the user via Queries
// Resolver Functions MongoDB model's create() method, find() method, findById() method 
// =========================

module.exports = {
    newNote: async (parent, args, { models }) => {
        return await models.Note.create({
            content: args.content,
            author: "Steve Archuleta"
    });
    } 
}