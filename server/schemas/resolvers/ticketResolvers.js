const { ApolloError } = require('apollo-server-errors');
const { Ticket } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    Query: {
        tickets: async () => {
            return Ticket.find();
        },
        ticket: async (parent, { ID }) => {
            return Ticket.findById(ID);
        },
    },

    Mutation: {
        createTicket: async (_, { ticketInput: { title, description, category, priority, createdBy }}) => {
            const newTicket = new Ticket({
                title: title,
                description: description,
                category: category,
                priority: priority,
                createdBy: createdBy
            })

            const res = await newTicket.save();

            return {
                id: res.id,
                ...res._doc
            }
        }
    }
};