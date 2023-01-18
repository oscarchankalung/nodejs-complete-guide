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
const mongodb = require("mongodb");

const User = require("./models/user");
const defaultUserId = "000000000000000000000001";

app.use((req, res, next) => {
  User.findById(defaultUserId)
    .then(user => {
      if (!user) {
        req.user = new User({
          _id: new mongodb.ObjectId(defaultUserId),
          name: "Oscar",
          email: "test@test.com",
          cart: { items: [] },
        });
        req.user.save();
      } else {
        req.user = user;
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

connectMongodb(() => null);

// mongoose

const mongoose = require("mongoose");

const password = "byo8A220Al1sTtnS";
const uri = `mongodb+srv://oscarchankalung:${password}@cluster0.vccxw.mongodb.net/shop?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log({ err });
  });
