const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { createToken };
