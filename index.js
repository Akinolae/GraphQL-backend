require("dotenv").config();
const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const schemas = require("./schemas");
const mongoose = require("mongoose");
const customer = require("./model/index");
const functions = require("./functions/index");

const URI = process.env.DB;
const dbConfig = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    console.log("==== Connection established ====");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const app = express();

const schema = buildSchema(`${schemas}`);

var root = {
  ...functions,
  // quoteOfTheDay: () => {
  //   return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  // },
  // random: async ({ name }) => {
  //   try {
  //     const res = await customer.find();
  //     const info =
  //       res.find((user) => user.firstName.toLowerCase().includes(name)) || {};
  //     if (Object.keys(info).length === 0) throw "User does't exist";
  //     return {
  //       firstName: info.firstName,
  //       lastName: info.lastName,
  //       email: info.email,
  //       accountNumber: info.accountNumber,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // rollThreeDice: () => {
  //   return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  // },
  // user: async function name({ firstName, lastName }) {
  //   return firstName + " " + lastName;
  // },
  // userInfo: () => {
  //   return {
  //     name: "Akinola",
  //     country: "Nigeria",
  //   };
  // },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  // process.on("warning", (e) => console.warn(e.stack));
  dbConfig();
  console.log(`app is running ${4000}`);
});
