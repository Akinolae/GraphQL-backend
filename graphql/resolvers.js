import customer from "../model/index.js";
import fetch from "node-fetch";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    liveData: async () => {
      try {
        const res = await fetch(
          "https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,GBP",
          {
            headers: {
              apikey: "LVERibMDMr46Hh7sEyzaoTIdEgWdE5q6",
            },
          }
        );

        console.log(await res.json());
        return (await res.json()).quotes;
      } catch (error) {
        throw new Error(error);
      }
    },
    random: async (parent, args, context) => {
      const { name } = parent;
      if (!name || typeof name === "undefined")
        throw new Error("Name is required");
      const res = await customer.find();
      const info =
        res.find(
          (user) => user.firstName.toLowerCase() === name.toLowerCase()
        ) || {};
      if (Object.keys(info).length === 0)
        throw new GraphQLError("User doesn't exist");
      else {
        return {
          firstName: info.firstName,
          lastName: info.lastName,
          email: info.email,
          accountNumber: info.accountNumber,
        };
      }
    },
  },
  Mutation: {
    user: async (parent, args, context) => {
      const { firstName, lastName } = args.input;
      //   console.log({ context });

      if (
        !firstName ||
        !lastName ||
        typeof firstName === "undefined" ||
        typeof lastName === "undefined"
      )
        throw new Error("All fields are required");
      const res = await customer.find();
      const info =
        res.find(
          (user) =>
            user.firstName.toLowerCase() === firstName.toLowerCase() &&
            user.lastName.toLowerCase() === lastName.toLowerCase()
        ) || {};
      if (Object.keys(info).length === 0) throw new Error("User doesn't exist");
      else {
        return {
          firstName: info.firstName,
          lastName: info.lastName,
          email: info.email,
          accountNumber: info.accountNumber,
        };
      }
    },
  },
};

export default resolvers;
