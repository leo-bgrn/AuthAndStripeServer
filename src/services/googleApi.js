const fetch = require("node-fetch");

async function getUserInfo(accessToken) {
  const URL = "https://www.googleapis.com/oauth2/v3/userinfo";
  return fetch(URL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      Accept: "*/*",
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
