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
        pendingAdminUsers: async (parent) => {
            const users = await User.find({ pending_admin: true });
            return users;
        }
    },

    Mutation: {

        registerUser: async (_, { registerInput: { username, email, password, admin_requested } }) => {
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
                password: encryptedPassword,
            })

            console.log("admin_requested ", admin_requested)
            if (admin_requested == true) {
                newUser.perms = 'admin',
                newUser.pending_admin = true
            } else {
                newUser.perms = 'normal_user',
                newUser.pending_admin = false
            }

            //Create our JWT (attach to User model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            console.log(newUser)

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
            console.log(user);

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
                    perms: user.perms,
                    ...user._doc
                }
            } else {
                //If user doesn't exist, throw error
                throw new ApolloError('Incorrect password!', "INCORRECT_PASSWORD")
            }        
        },

        approveAdminUser: async(_, { _id }) => {
            const pendingUser = await User.findByIdAndUpdate(_id, { pending_admin: false }, { new: true });
            return pendingUser;
            
        },

        denyAdminUser: async(_, { _id }) => {
            const pendingUser = await User.findByIdAndUpdate(_id, { denied: true }, { new: true });
            return pendingUser;
        }

    }
};