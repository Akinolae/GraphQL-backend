import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import { dbConfig } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => error.message,
});
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    console.log(req.headers.authorization);
    // const authorization = req.headers.authorization;
    return {
      req,
      res,
    };
  },
  listen: { port: 4000 },
});

dbConfig();
console.log(`app is running ${url}`);
