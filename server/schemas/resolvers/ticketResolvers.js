const { ApolloError } = require('apollo-server-errors');
const { Ticket } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    Query: {
        tickets: async () => {
            return Ticket.find();
        },
        ticket: async (parent, { _id }) => {
            return Ticket.findById(_id);
        },
        findCreatedBy: async(parent, { _id }) => {
            const ticket = await Ticket.find({ createdBy: _id });
            return ticket;
        },
        findOpenTickets: async(parent) => {
            const tickets = await Ticket.find({ isOpen: true});
            return tickets;
        }
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
        },

        updateTicket: async (_, { updateTicketInput: { title, description, _id }}) => {
            return Ticket.findByIdAndUpdate(_id, {title: title, description: description}, {new: true});
        },

        closeTicket: async(_, {_id}) => {
            console.log('closing ticket')
            return Ticket.findByIdAndUpdate(_id, {isOpen: "false"}, {new: true});
        }
    }
};