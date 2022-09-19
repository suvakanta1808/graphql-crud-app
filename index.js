const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server');
const { EnvelopArmor } = require('@escape.tech/graphql-armor');
require('dotenv').config();

const gqlSchema = require('./graphql/schema');
const gqlResolvers = require('./graphql/resolvers');
const connectDB = require('./db/connect');

const armor = new EnvelopArmor({
   blockFieldSuggestion: {
        enabled: true,
   }
});

const { plugins } = armor.protect();

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
        ...plugins,
        ApolloServerPluginLandingPageLocalDefault({  
            embed: true
        })
    ],
  });

  async function startServer() {
    try {
        await connectDB();
        server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
            });
    } catch (error) {
        console.log(error);
    }
  };

  startServer();
  