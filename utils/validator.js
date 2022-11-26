import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const verifyUserAccessToken = (token) => {
  return jwt.verify(token, "afrobank", (err, data) => {
    if (err) throw err.message;
    return data;
  });
};

const decryptPassword = async (password1, password2) => {
  const decrypt = await bcrypt.compare(password1, password2);
  return decrypt;
};

const generateUserAccessToken = (payload) => {
  return jwt.sign(payload, "afrobank", {
    expiresIn: "2 days",
  });
};

export { verifyUserAccessToken, decryptPassword, generateUserAccessToken };
