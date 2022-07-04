const userResolvers = require('./userResolvers');
const ticketResolvers = require('./ticketResolvers');

module.exports = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    },
};