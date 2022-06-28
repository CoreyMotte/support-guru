const { Schema, model } = require('mongoose');
const moment = require('moment');

const commentSchema = new Schema(
    {
        commentId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        commentBody: {
            type: String,
            required: true
        },
        commentBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const ticketSchema = new Schema(
    {
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
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ticketSchema.virtual("commentCount").get(function () {
    return this.comments.length;
});

const Ticket = model('ticket', ticketSchema);

module.exports = Ticket;