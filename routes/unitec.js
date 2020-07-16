const express = require("express");
const router = express.Router();
const db = require("../db");
const mongoose = require("mongoose");
const { Subject, convertData } = require("../modules/unitec_model");
const { ObjectID } = require("mongodb");

// const Unitec = mongoose.model("unitec", SchemaUntec);

router.get("/", (req, res) => {
  Subject.find({})
    .then((resp) => {
      res.json(resp);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/save", (req, res) => {
  try {
    const element = req.body;
    console.log(element);
    saveDocument(element, res);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    const element = await Subject.findById(req.body.id);
    console.log(element);
    element
      .updateOne(convertData(req.body))
      .then((resp) => {
        console.log("returned", resp);
        res.status(200).send("Document has been updated");
      })
      .catch((error) => res.status(404).send(error));
  } catch (error) {
    res.send("There were a problem in the put method", error);
  }
});

router.put("/saveupdate", async (req, res) => {
  try {
    const element = convertData(req.body);
    console.log(element);
    const subject = await Subject.findOne({
      NameClass: element.NameClass,
      Seccion: { $eq: element.Seccion },
    });

    if (subject !== null) {
      subject
        .updateOne(element)
        .then((resp) => {
          console.log(resp);
          res.send("The document has been updated");
        })
        .catch((error) =>
          res.send("Error, maybe the document does not exist", error.message)
        );
      return;
    } else {
      saveDocument(req.body, res);
    }
  } catch (error) {}
});

function saveDocument(element, res) {
  const subject = new Subject(convertData(element));
  subject
    .save()
    .then((resp) => {
      console.log(resp);
      res.status(200).send("Saved");
    })
    .catch((error) => {
      console.log(error);
      res.send("Error");
    });
}

module.exports = router;
