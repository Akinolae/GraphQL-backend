import { extractConfig } from "../utils/extractENV.js";
import mongoose from "mongoose";

const URI = extractConfig("uri");

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
