//  type definitions for our graphQL schema. think of these as the object blueprints for our schema
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String,
        password: String,
        fullName: String
    }

    type Query {
        user: User
    }
`;

module.exports = typeDefs;

