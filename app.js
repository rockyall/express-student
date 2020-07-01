const express = require("express");
const app = express();
const db = require("./db");
const auth = require("./middleware/auth_goes_here");
const welcome = require("./middleware/welcomething");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const cors = require("cors");
const mongoose = require("mongoose");
const unitec = require("./routes/unitec");
console.clear();

//Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use(welcome);

//Via de acceso a raiz
app.get("/", function (req, res) {
  var response = "Hello World";
  response += `\nRequrested at ${req.headers.host}`;
  res.status(200).send(response);
});

//Routers
app.use("/api/unitec", unitec);

const port = process.env.PORT || 3006;
db.connectDB(() => {
  app.listen(port, () => {
    console.log(`\n${"-".repeat(80)}\nListeningg on port ${port}`);
  });
});
