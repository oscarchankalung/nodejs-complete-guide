const mongodb = require("mongodb");
const User = require("../models/user");

const DEFAULT_USER_ID = "000000000000000000000001";

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById(DEFAULT_USER_ID)
    .then(user => {
      if (!user) {
        req.session.isLoggedIn = true;
        req.session.user = new User({
          _id: new mongodb.ObjectId(defaultUserId),
          name: "Oscar",
          email: "test@test.com",
          cart: { items: [] },
        });
        req.user.save();
      } else {
        req.session.isLoggedIn = true;
        req.session.user = user;
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
};
