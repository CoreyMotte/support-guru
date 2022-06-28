// functions that populate our schema with data
// this file contains both queries and mutations (read and write)
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers;