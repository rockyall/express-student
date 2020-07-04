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
const port = process.env.PORT || 3006;
console.clear();

//Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.use(welcome);

//Routers
app.use("/api/unitec", unitec);

//Via de acceso a raiz
app.get("/", function (req, res) {
  var response = "Hello World";
  response += `\nRequrested at ${req.headers.host}`;
  res.status(200).send(response);
});

mongoose
  .connect("mongodb://localhost:27017/unitec", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((resp) => {
    console.log("Connected to local mongodb\n");
  })
  .catch((err) => console.log("Some error has occured", err.message));

app.listen(port, () => {
  console.log(`\n${"-".repeat(60)}\nListening on port ${port}`);
});
