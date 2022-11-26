import customer from "../model/index.js";
import fetch from "node-fetch";
import { GraphQLError } from "graphql";
import {
  decryptPassword,
  generateUserAccessToken,
} from "../utils/validator.js";

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
      const { user } = context;
      if (Object.keys(user).length === 0) return;

      if (
        !firstName ||
        !lastName ||
        typeof firstName === "undefined" ||
        typeof lastName === "undefined"
      )
        throw new Error("All fields are required");
      const res =
        (await customer.find()).find(({ email }) => email === user.email) || {};
      if (Object.keys(res).length === 0) throw new Error("User doesn't exist");
      else {
        return {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          accountNumber: res.accountNumber,
        };
      }
    },
    login: async (parent, args, context) => {
      const { username, userPassword } = args.input;
      const res =
        (await customer.find()).find(({ email }) => email === username) || {};

      if (Object.keys(res).length === 0) throw new Error("User doesn't exist");
      else {
        const { email, password } = res;

        const isValidUser =
          email !== username ||
          !(await decryptPassword(userPassword, password));
        if (isValidUser) throw new Error("Invalid login parameters");
        else {
          const token = generateUserAccessToken({
            id: res.id,
            email: res.email,
          });

          return {
            token,
            has2fa: res["2faEnabled"],
            email,
          };
        }
      }
    },
  },
};

export default resolvers;
