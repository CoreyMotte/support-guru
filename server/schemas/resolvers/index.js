const userResolvers = require('./userResolvers');

module.exports = {
    Query: {
        ...userResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    },
};