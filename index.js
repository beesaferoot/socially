require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const mongoose = require("mongoose");
const mongoUri = process.env.DATABASE_URL;
mongoose.connect(mongoUri);
const database = mongoose.connection;

database.on("error", (err) => {
  console.log(err);
});

database.once("connected", () => {
  console.log("Database connected.");
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  })
);

app.listen(3000, () => {
  console.log(`Server started at ${3000}`);
});

const routes = require("./routes/routes");

app.use("/api", routes);
