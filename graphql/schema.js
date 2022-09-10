const { gql } = require('apollo-server');

const schema = gql`
    type User {
        _id: ID!,
        fullname: String
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

    type AuthData {
        token: String
        userId: String
    }

    input JournalInput {
        content: String!
    }

    input UserAuthInput {
        username: String
        password: String
    }

    input UserSignUpInput {
        username: String
        fullname: String
        password: String
    }

    type Query {
        journals: [Journal]
        login(authData: UserAuthInput!): AuthData!
    }

    type Mutation {
        createJournal(input: JournalInput!): Journal!
        signup(userAuthInput: UserSignUpInput!): User!
    }
`;

module.exports = schema