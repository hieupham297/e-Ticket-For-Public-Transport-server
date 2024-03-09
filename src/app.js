const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Client } = require("./db/dbConnection");
const router = require("./routes/index");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

module.exports = app;
