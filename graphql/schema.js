const { ApolloServer,gql } = require('apollo-server');

const schema = gql`
    type User {
        userId: String
        fullName: String
        username: String
        journals: [Journal]
    }

    type Journal {
        journalId: String
        dop: String
        authorId: String
        content: String
        image: String
        likes: [User]
        dislikes: [User]
    }

    type Query {
        journals: [Journal]
    }
`;

module.exports = schema