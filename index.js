import express from "express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import schemas from "./graphql/schemas.js";
import resolvers from "./graphql/resolvers.js";
import cors from "cors";
import { dbConfig } from "./config/dbConfig.js";

const app = express();
const schema = buildSchema(`${schemas}`);

app.use(cors());

app.use(
  "/users/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: { ...resolvers },
    graphiql: true,
    pretty: true,
    customFormatErrorFn: (error) => error.message,
  })
);

app.listen(4000, () => {
  // process.on("warning", (e) => console.warn(e.stack));
  dbConfig();
  console.log(`app is running ${4000}`);
});
