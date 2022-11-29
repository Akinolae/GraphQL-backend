import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { error as graphQlError } from "./utils/errorUtils.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { verifyUserAccessToken } from "./utils/validator.js";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => error.message,
  plugins: [
    ApolloServerPluginCacheControl({
      defaultMaxAge: 1,
      calculateHttpHeaders: false,
    }),
  ],
});

export const graphqlHandler = startServerAndCreateLambdaHandler(server, {
  context: async ({ event, context }) => {
    return {
      lambdaEvent: event,
      lambdaContext: context,
    };
  },
});

dbConfig();
console.log(`app is running`);
