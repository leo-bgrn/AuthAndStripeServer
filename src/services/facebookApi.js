const fetch = require("node-fetch");

async function getUserInfo(accessToken) {
  const URL =
    "https://graph.facebook.com/me?fields=first_name,last_name,email&access_token=" +
    accessToken;
  return fetch(URL, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(
        "An error occurred while getting user info from Facebook API. Error: " +
          error
      );
      throw error;
    });
}

module.exports = {
  getUserInfo,
};
