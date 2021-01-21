const googleApi = require("../../services/googleApi");

describe("Google Api tests", () => {
  beforeEach(() => {});
  afterEach(() => {});

  xit("should return user info", async () => {
    const accessToken = "YOUR_ACCESS_TOKEN";
    const userInfo = await googleApi.getUserInfo(accessToken);
    console.log(userInfo);
  });
});
