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
        likes: [String]
        dislikes: [String]
    }

    type AuthData {
        token: String
        userId: String
    }

    input JournalInput {
        content: String!
    }

    input JournalUpdateInput {
        id: ID!
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
        getJournal(id: ID!): Journal!
        getUser(id: ID!): User!
    }

    type Mutation {
        createJournal(input: JournalInput!): Journal!
        signup(userAuthInput: UserSignUpInput!): User!
        updateJournal(updateJournalInput: JournalUpdateInput!): Journal!
        deleteJournal(id: ID!): Journal!
        likeJournal(id: ID!): Journal!
        dislikeJournal(id: ID!): Journal!
    }
`;

module.exports = schema