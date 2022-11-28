import customer from "../model/index.js";
import transactions from "../model/transactions.js";
import {
  decryptPassword,
  generateUserAccessToken,
} from "../utils/validator.js";
import { error as graphqlError } from "../utils/errorUtils.js";

const resolvers = {
  Query: {
    getTransactions: async (parent, args, context) => {
      const { id } = context.user;
      try {
        const userTrx = (await transactions.find({ user_id: id })) || [];
        return userTrx;
      } catch (error) {
        throw graphqlError(error);
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
      console.log(context);
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
