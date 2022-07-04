const { Schema, model } = require('mongoose');
const moment = require('moment');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true
        },
        ticket: {
            type: Schema.Types.ObjectId,
            ref: 'ticket'
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const Comment = model('comment', commentSchema);

module.exports = Comment;
