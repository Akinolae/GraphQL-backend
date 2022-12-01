import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { error as graphQlError } from "./utils/errorUtils.js";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import { verifyUserAccessToken } from "./utils/validator.js";

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
    if (!event.headers.authorization) throw graphQlError("Token required");
    const authorization = event.headers.authorization.split(" ")[1];
    const verifyUser = verifyUserAccessToken(authorization);
    if (!verifyUser) throw graphQlError("User not found");

    return {
      lambdaEvent: event,
      lambdaContext: context,
    };
  },
});
