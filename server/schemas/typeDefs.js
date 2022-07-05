//  type definitions for our graphQL schema. think of these as the object blueprints for our schema
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        token: String
        openedTickets: [Ticket!]
    }

    input RegisterInput {
        username: String
        email: String
        password: String
        confirmPassword: String
    }

    input LoginInput {
        email: String
        password: String
    }

    type Ticket {
        _id: ID
        title: String
        description: String
        isOpen: Boolean
        createdAt: String
        createdBy: User!
        priority: String
        category: String
    }

    input TicketInput {
        title: String
        description: String
        category: String
        priority: String
        createdBy: String
    }

    type Query {
        users: [User]
        tickets: [Ticket]
        user(id: ID!): User
        ticket(_id: String!): Ticket
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        createTicket(ticketInput: TicketInput): Ticket
    }
`;

module.exports = typeDefs;

