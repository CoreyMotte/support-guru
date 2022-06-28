//  type definitions for our graphQL schema. think of these as the object blueprints for our schema
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): AuthData!
        login(email: String!, password: String!): AuthData!
    }
`;

module.exports = typeDefs;

