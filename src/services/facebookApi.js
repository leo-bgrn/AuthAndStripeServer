const fetch = require("node-fetch");

async function getUserInfo(accessToken) {
  const URL = "https://graph.facebook.com/v9.0/me";
  return fetch(URL, {
    method: "GET",
    params: {
      access_token: accessToken,
      fields: "first_name,last_name,email",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(
        "An error occurred while getting user info from Google API. Error: " +
          error
      );
      throw error;
    });
}

module.exports = {
  getUserInfo,
};
