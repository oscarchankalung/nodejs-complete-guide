const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "index.html"));
  res.render("index", { pageTitle: "Add User" });
});

router.post("/", (req, res, next) => {
  users.push({ name: req.body.name });
  res.redirect("/users");
});

router.get("/users", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "users.html"));
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
  });
});

module.exports = router;
