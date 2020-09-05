const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  try {
    res.send("This http method works fine\n");
  } catch (error) {
    res.send("The error works\n");
  }
});

module.exports = router;
