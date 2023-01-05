// express app

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

// express route

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  next();
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);
app.use(errorController.get404);

// mongodb

const { connectMongodb } = require("./util/database");

connectMongodb(() => {
  app.listen(3000);
});
