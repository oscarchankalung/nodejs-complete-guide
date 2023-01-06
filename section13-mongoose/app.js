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
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const User = require("./models/user");
const defaultUserId = "000000000000000000000001";

app.use((req, res, next) => {
  User.findById(defaultUserId)
    .then(user => {
      if (!user) {
        req.user = new User(defaultUserId, "Oscar", "test@test.com", null);
        req.user.save();
      } else {
        req.user = new User(user._id, user.name, user.email, user.cart);
      }
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// mongodb

const { connectMongodb } = require("./util/database");

connectMongodb(() => {
  app.listen(3000);
});
