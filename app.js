const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database: ", err);
  }
}

init();

const indexRouter = require("./backend/api/index");
const usersRouter = require("./backend/api/users");
const productsRouter = require("./backend/api/products");
const ordersRouter = require("./backend/api/orders");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

module.exports = app;