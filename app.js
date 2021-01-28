var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const userController = require("./src/controllers/users.controller");

var app = express();

app.use(async (req, res, next) => {
  // Get auth token from the cookies
  const bearerToken = req.headers["authorization"];
  if (bearerToken) {
    const authToken = bearerToken.split(" ")[1];
    const authTokens = await userController.getAuthTokens();
    req.user = authTokens[authToken];
  }

  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
