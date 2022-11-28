import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { error as graphQlError } from "./utils/errorUtils.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { verifyUserAccessToken } from "./utils/validator.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";

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

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    let user;
    if (!req.headers.authorization)
      throw graphQlError("No token provided", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    else {
      const token = req.headers.authorization.split(" ")[1];
      try {
        user = verifyUserAccessToken(token);
      } catch (error) {
        throw graphQlError(error, {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
    }
    return { user };
  },
  listen: { port: 4000 },
});

dbConfig();
console.log(`app is running ${url}`);
