import dotEnv from "dotenv";
dotEnv.config();

const config = {
  uri: process.env.DB,
};

const extractConfig = (param = "") => {
  let value;
  if (!param) throw new Error("Params is required");
  else if (config[param.toLowerCase()] === undefined || null)
    throw new Error(`Unable to fetch ${param}'s config`);
  else {
    value = config[param.toLowerCase()];
  }
  return value;
};

export { extractConfig };
