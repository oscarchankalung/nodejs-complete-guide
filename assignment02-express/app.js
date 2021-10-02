const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("This is a middleware that always runs.");
  next();
});

app.use("/users", (req, res, next) => {
  console.log("This is a handler that returns users page.");
  res.send("<h1>Users Page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("This is a handler that returns home page.");
  res.send("<h1>Home Page</h1>");
});

app.listen(3000);
