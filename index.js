import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { GraphQLError } from "graphql";
import { verifyUserAccessToken } from "./utils/validator.js";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => error.message,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    let user;
    if (!req.headers.authorization)
      throw new GraphQLError("No token provided", {
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
        throw new GraphQLError(error, {
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
