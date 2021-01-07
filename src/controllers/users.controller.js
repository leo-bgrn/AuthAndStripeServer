const crypto = require("crypto");

let users = [];

async function getUsers() {
  return users;
}
async function registerUser(email, firstName, lastName, password) {
  users.push({
    firstName,
    lastName,
    email,
    password: password,
  });
}

let authTokens = {};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

async function loginUser(user) {
  const authToken = generateAuthToken();

  // Store authentication token
  authTokens[authToken] = user;

  return authToken;
}

async function getAuthTokens() {
  return authTokens;
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getAuthTokens,
};
