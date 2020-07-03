const express = require("express");
const router = express.Router();
const db = require("../db");
const { Unitec } = require("../modules/unitec_model");
const ObjectID = require("mongodb").ObjectID;

router.get("/", (req, res) => {
  FindAll(res);
});

router.get("/:name", (req, res) => {
  try {
    console.log(req.params);
    db.getDB()
      .find({ NameClass: req.params.name })
      .toArray()
      .then((ClassFiltered) => {
        console.log(ClassFiltered);
        res.send(ClassFiltered);
      });
    db.closeDB();
  } catch (error) {
    res.status(404).send("404 deadmau5 Not Found");
  }
});

router.post("/save", (req, res) => {
  try {
    const element = req.body;
    console.log(element);
    db.getDB().insertOne(element, function (err, res) {
      if (err) throw err;
      console.log("Document inserted");
      db.closeDB();
    });
    res.send(element);
  } catch (error) {}
});

router.put("/update", (req, res) => {
  try {
    let CommingClass = req.body;
    console.log("This is the result", CommingClass);
    var OriginalClass = null;
    // var objectID = new objectId(CommingClass._id);
    db.getDB()
      .findOne({ _id: new ObjectID(CommingClass._id) })
      .then((resp) => {
        OriginalClass = resp;
        db.getDB()
          .updateOne(
            { _id: new ObjectID(CommingClass._id) },
            { $set: { Seccion: CommingClass.Seccion } }
          )
          .then((resp) => {
            console.log("The document has been updated\n");
            console.log(resp);
            res.send(resp);
          });
      });
  } catch (error) {
    res.send("There were a problem in the put method", error);
  }
});

module.exports = router;
