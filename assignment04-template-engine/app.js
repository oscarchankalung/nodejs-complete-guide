const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const app = express();
const rootDir = require("./utils/path");

// middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// engine
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "pug");
app.set("views", "views");

// data
const users = [];

// routes
app.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "index.html"));
  res.render("index", {
    pageTitle: "Add User",
    path: "/",
    activeIndex: true,
  });
});

app.get("/users", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "users.html"));
  res.render("users", {
    pageTitle: "Users List",
    path: "/users",
    activeUser: true,
    users: users,
    hasUsers: users.length > 0,
  });
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

app.listen(3000);
