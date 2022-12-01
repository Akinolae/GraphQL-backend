import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { error as graphQlError } from "./utils/errorUtils.js";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";

dbConfig();

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => graphQlError(error.message),
  plugins: [
    ApolloServerPluginCacheControl({
      defaultMaxAge: 1,
      calculateHttpHeaders: false,
    }),
  ],
});

export const graphqlHandler = startServerAndCreateLambdaHandler(server, {
  context: async ({ event, context }) => {
    console.log({ event, context });
    return {
      lambdaEvent: event,
      lambdaContext: context,
    };
  },
});
