const userResolvers = require('./userResolvers');
const ticketResolvers = require('./ticketResolvers');

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...ticketResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...ticketResolvers.Mutation
    },
};