var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const userController = require("../controllers/users.controller");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

users = [];

router.post("/register", async function (req, res, next) {
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    const users = await userController.getUsers();
    if (users.find((user) => user.email === email)) {
      res.status(400).send("Email already used");
      return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    await userController.registerUser(
      email,
      firstName,
      lastName,
      hashedPassword
    );

    res.status(201).send("Registration Complete. Please login to continue.");
    return;
  } else {
    res.status(400).send("Password does not match.");
    return;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = getHashedPassword(password);

  const users = await userController.getUsers();
  const user = users.find((u) => {
    return u.email === email && hashedPassword === u.password;
  });

  if (user) {
    let authToken = await userController.loginUser(user);
    res.status(200).send({
      token: authToken,
    });
    return;
  } else {
    res.status(400).send("Invalid username or password");
    return;
  }
});

module.exports = router;
