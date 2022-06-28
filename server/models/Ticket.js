const { Schema, model } = require('mongoose');

const ticketSchema = new Schema ({
    ticketId: {
        type: Number,
        required: true,
        autoIncrement: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
});

const Ticket = model('user', ticketSchema);

module.exports = Ticket;