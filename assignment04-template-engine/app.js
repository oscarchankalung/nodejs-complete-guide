const express = require("express");

const app = express();
const routes = require("./routes/index");

app.use(express.static("public"));

app.use(routes);

app.listen(3000);
