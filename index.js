require("dotenv").config();
const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schemas = require("./schemas");
const functions = require("./functions/index");
const cors = require("cors");
const { dbConfig } = require("./config/dbConfig");

const app = express();
const schema = buildSchema(`${schemas}`);

app.use(cors());

app.use(
  "/users/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: { ...functions },
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
