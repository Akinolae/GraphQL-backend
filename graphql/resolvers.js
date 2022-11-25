import customer from "../model/index.js";
import fetch from "node-fetch";
// const fetch = require("node-fetch");

const random = async (parent, args, context) => {
  const { name } = parent;
  if (!name || typeof name === "undefined") throw new Error("Name is required");
  const res = await customer.find();
  const info =
    res.find((user) => user.firstName.toLowerCase() === name.toLowerCase()) ||
    {};
  if (Object.keys(info).length === 0) throw new Error("User doesn't exist");
  else {
    return {
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      accountNumber: info.accountNumber,
    };
  }
};

const user = async (parent, args, context) => {
  const { firstName, lastName } = parent.input;
  if (
    !firstName ||
    !lastName ||
    typeof firstName === "undefined" ||
    typeof lastName === "undefined"
  )
    throw new Error("All fields are required");
  const res = await customer.find();
  console.log(res);
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
};

const liveData = async () => {
  console.log("called");
  try {
    const res = await fetch("https://api.apilayer.com/currency_data/live", {
      headers: {
        apikey: "LVERibMDMr46Hh7sEyzaoTIdEgWdE5q6",
      },
    });

    return (await res.json()).quotes;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  random,
  user,
  liveData,
};
