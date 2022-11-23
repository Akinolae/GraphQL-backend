const customer = require("../model/index");

const random = async ({ name }) => {
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

module.exports = {
  random,
};
