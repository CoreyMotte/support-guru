// functions that populate our schema with data
// this file contains both queries and mutations (read and write)
const { ApolloError } = require('apollo-server-errors');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { ID }) => {
            return User.findById(ID);
        },
    },

    Mutation: {

        registerUser: async (_, { registerInput: { username, email, password } }) => {
            //See if an old user exists with this email
            const oldUser = await User.findOne({ email });
            if (oldUser) {
                //Throw error if that user exists
                throw new ApolloError('A user is already registered with this email.', 'USER_ALREADY_EXISTS');
            }

            //Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            //Build out mongoose model
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            //Create our JWT (attach to User model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            //Save our user in MongoDB
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },

        loginUser: async (_, { loginInput: { email, password } }) => {
            //See if a user exists with the email
            const user = await User.findOne({ email });

            //Check if the entered password equals the encrypted password
            if (user && (await bcrypt.compare(password, user.password))) {
                //Create a NEW token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );
                //Attach token to User model
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                //If user doesn't exist, throw error
                throw new ApolloError('Incorrect password!', "INCORRECT_PASSWORD")
            }        
        }

    }
};