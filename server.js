const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes/api.js");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// routes
app.get("/workouts", (req, res) => {
  db.workwout.find({})
    .then(dbWorkwout => {
      res.json(dbWorkwout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
