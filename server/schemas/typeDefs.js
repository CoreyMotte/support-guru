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
        perms: String
        pending_admin: Boolean
        denied: Boolean
    }

    input RegisterInput {
        username: String
        email: String
        password: String
        confirmPassword: String
        perms: String
        admin_requested: String
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
        createdBy: User
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

    input UpdateTicketInput {
        _id: ID
        title: String
        description: String
    }

    type Query {
        users: [User]
        user(id: ID!): User
        pendingAdminUsers: [User]

        tickets: [Ticket]
        ticket(_id: String!): Ticket
        findCreatedBy(_id: String!): [Ticket]
        findOpenTickets: [Ticket]
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        createTicket(ticketInput: TicketInput): Ticket
        updateTicket(updateTicketInput: UpdateTicketInput): Ticket
        closeTicket(_id: String): Ticket
        approveAdminUser(_id: String): User
        denyAdminUser(_id: String): User
        
    }
`;

module.exports = typeDefs;

