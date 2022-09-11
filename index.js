const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const gqlSchema = require('./graphql/schema');
const gqlResolvers = require('./graphql/resolvers');
const connectDB = require('./db/connect');

const server = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: gqlResolvers,
    csrfPrevention: true,
    introspection: true,
    cache: 'bounded',
    context: ({ req }) => {
        const authHeaders = req.headers.authorization || '';
        const token = authHeaders.split(' ')[1];
        return { token: token };
    },
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({  
            embed: true
        })
    ],
  });

  async function startServer() {
    try {
        await connectDB();
        server.listen().then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
            });
    } catch (error) {
        console.log(error);
    }
  };

  startServer();
  