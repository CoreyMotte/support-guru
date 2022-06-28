//  type definitions for our graphQL schema. think of these as the object blueprints for our schema
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Ticket {
        ticketId: ID
        title: String
        description: String
        isOpen: Boolean
        createdAt: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type Query {
        users: [User]
        tickets: [Ticket]
        user(username: String!): User
        ticket(ticketId: String!): Ticket
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): AuthData!
        login(email: String!, password: String!): AuthData!
    }
`;

module.exports = typeDefs;

