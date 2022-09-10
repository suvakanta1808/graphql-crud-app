const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server');

const gqlSchema = require('./graphql/schema');
const gqlResolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs: gqlSchema,
    resolvers: gqlResolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({  
            embed: true
        })
    ],
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });