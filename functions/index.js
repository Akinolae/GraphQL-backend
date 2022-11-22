const customer = require("../model/index");

const random = async ({ name }) => {
  try {
    const res = await customer.find();
    const info =
      res.find((user) => user.firstName.toLowerCase().includes(name)) || {};
    console.log(info);
    if (Object.keys(info).length === 0) throw "User does't exist";
    return {
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      accountNumber: info.accountNumber,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  random,
};
