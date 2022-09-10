const { gql } = require('apollo-server');

const schema = gql`
    type User {
        fullName: String
        username: String
        journals: [Journal]
    }

    type Journal {
        dop: String
        authorId: String
        content: String
        likes: [User]
        dislikes: [User]
    }

    type Query {
        journals: [Journal]
    }

    input JournalInput {
        authorId: String!
        dop: String!
        content: String!
    }

    type Mutation {
        createJournal(input: JournalInput!): Journal!
    }
`;

module.exports = schema