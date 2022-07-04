const { Schema, model } = require('mongoose');
const moment = require('moment');
const Comment = require('./Comment');

const ticketSchema = new Schema(
    {
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
        },
        category: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);



const Ticket = model('ticket', ticketSchema);

module.exports = Ticket;