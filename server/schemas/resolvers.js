// functions that populate our schema with data
// this file contains both queries and mutations (read and write)

const resolvers = {
    Query: {
        user: () => {
            return user;
        }
    }
};

module.exports = resolvers;