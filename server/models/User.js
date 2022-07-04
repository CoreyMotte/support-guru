const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minLength: [8, 'Password must contain at least 8 characters.']
    },
    openedTickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});

// method to compare hashed password with password entered
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);

module.exports = User;