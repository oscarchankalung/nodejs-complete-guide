const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "ejs");
app.set("views", "views");

const routes = require("./routes/index");

app.use(routes);

app.listen(3000);
