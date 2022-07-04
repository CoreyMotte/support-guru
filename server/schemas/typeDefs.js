//  type definitions for our graphQL schema. think of these as the object blueprints for our schema
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        openedTickets: [Ticket!]
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
        comments: [Comment]
    }

    type Comment {
        _id: ID
        ticket: Ticket!
        createdBy: User!
        createdAt: String!
        updatedAt: String!
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
        ticket(_id: String!): Ticket
        comments: [Comment]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): AuthData!
        login(email: String!, password: String!): AuthData!
        createTicket(title: String!, description: String!, category: String!, priority: String!, createdBy: String!): Ticket
        addComment(ticketId: ID!): Comment
    }
`;

module.exports = typeDefs;

