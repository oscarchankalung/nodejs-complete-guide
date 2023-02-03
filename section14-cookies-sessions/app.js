// express app

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// express route

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// mongoose

const mongoose = require("mongoose");
const MONGODB_PASSWORD = "byo8A220Al1sTtnS";
const MONGODB_URI = `mongodb+srv://oscarchankalung:${MONGODB_PASSWORD}@cluster0.vccxw.mongodb.net/shop`;

// express app

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const cookie = {
  maxAge: 600000,
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  session({
    secret: "12345678",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: cookie,
  }),
);

app.set("view engine", "ejs");
app.set("views", "views");

// express route

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// mongoose

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log({ err });
  });
