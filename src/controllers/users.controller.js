const crypto = require("crypto");
const googleApi = require("../services/googleApi");

let users = [];

async function getUsers() {
  return users;
}
async function registerUser(email, firstName, lastName, password) {
  users.push({
    type: "EMAIL",
    firstName: firstName,
    lastName: lastName,
    email: email,
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

async function loginUserWithGoogle(googleAccessToken) {
  const userInfo = await googleApi.getUserInfo(googleAccessToken);
  const userAlreadySignedUp = users.find(
    (user) => user.email === userInfo.email
  );
  if (userAlreadySignedUp) {
    return await loginUser(userAlreadySignedUp);
  } else {
    const userToAdd = {
      type: "GOOGLE",
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      email: userInfo.email,
    };
    users.push(userToAdd);
    return await loginUser(userToAdd);
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getAuthTokens,
  loginUserWithGoogle,
};
