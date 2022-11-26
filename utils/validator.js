import jwt from "jsonwebtoken";

const verifyUserAccessToken = (token) => {
  return jwt.verify(token, "afrobank", (err, data) => {
    if (err) throw err.message;
    return data;
  });
};

export { verifyUserAccessToken };
