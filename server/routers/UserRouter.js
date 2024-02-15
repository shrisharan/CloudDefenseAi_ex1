const express = require("express");

const {
  getUserData,
  getUserRepoData,
} = require("../controllers/UserController");

const userRouter = express.Router();
userRouter.route("/").get(getUserData);
userRouter.route("/repo/:name").get(getUserRepoData);

module.exports = userRouter;
