import dotEnv from "dotenv";
dotEnv.config();

import mongoose from "mongoose";

const URI = process.env.DB;

const dbConfig = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("==== DB Connection established ====");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { dbConfig };
