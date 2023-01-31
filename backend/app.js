var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const passport = require("passport");
require("./config/passport");

var authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRouter
);
app.use(
  "/api/comment",
  passport.authenticate("jwt", { session: false }),
  commentRouter
);

module.exports = app;
