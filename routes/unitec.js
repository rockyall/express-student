const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  try {
    db.getDB()
      .find({})
      .toArray()
      .then((classes) => {
        console.log(classes);
        res.send(classes);
      });
    db.closeDB();
  } catch (error) {
    res.status(404).send("404 deadmau5 Not Found");
  }
});

module.exports = router;
