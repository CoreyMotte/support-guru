// functions that populate our schema with data
// this file contains both queries and mutations (read and write)
const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },

        tickets: async () => {
            return Ticket.find().populate('createdBy');
        },
        ticket: async (parent, { ticketId }) => {
            return Ticket.findOne({ ticketId });
        },

        comments: async () => {
            const comments = await Comment.find();
            return comments.map(comment => {
                return {
                    ...comment._doc,
                    _id: comment.id,
                    createdAt: new Date(comment._doc.createdAt).toISOString(),
                    updatedAt: new Date(comment._doc.createdAt).toISOString()
                }
            })
        }
    },

    Mutation: {

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { userId: user._id, token: token, tokenExpiration: '2h' };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Password is incorrect!');
            }
            const token = signToken(user);
            return { userId: user._id, token: token, tokenExpiration: '2h' };
        },

        createTicket: async (parent, { title, description, priority, category, createdBy }) => {
            const ticket = await Ticket.create({ title, description, priority, category, createdBy });
            return User.findById(createdBy)
                .then(user => {
                    user.openedTickets.push(ticket)
                    return user.save();
                })
        },

        addComment: async (parent, { ticketId }) => {
            const fetchedTicket = await Ticket.findById(ticketId);
            const comment = new Comment({
                createdBy: '62c2249a9315c286df64242b',
                ticket: fetchedTicket,
                commentBody: "test comment",
            })
            const result = await comment.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.createdAt).toISOString()
            }
        }
    }
};

module.exports = resolvers;