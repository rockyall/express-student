const ObjectID = require("mongodb").ObjectID;
const db = require("../db");

// Native driver functions for CRUD operations

function FindAll(res) {
  try {
    db.getDB()
      .find({})
      .toArray()
      .then((resp) => {
        db.closeDB();
        console.log(resp);
        res.send(resp);
        return true;
      })
      .catch((err) => {
        db.closeDB();
        res.status(404).send("Not Found, error in the promise");
        return false;
      });
  } catch (error) {
    console.log("Some error in the try catch");
  }
}

function FindDocumentByID(docID, doc) {
  try {
    db.getDB()
      .findone({ _id: new ObjectID(docID) })
      .then((resp) => {
        db.closeDB();
        console.log(resp);
        res.send(resp);
        return true;
      })
      .catch((error) => {
        return { msg: "Maybe the row was not found", err: error };
      });
  } catch (error) {
    console.log("Some error in the try catch");
  }
}

function SaveDocument(req, res) {
  try {
    const element = req.body;
    console.log(element);
    db.getDB().insertOne(element, function (err, res) {
      if (err) throw err;
      console.log("Document inserted");
      db.closeDB();
    });
    res.send(element);
  } catch (error) {
    console.log("Some error in the try catch");
  }
}

function UpdateDocument(req, res) {
  let CommingElement = req.body;
  console.log("this is the result", CommingElement);
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
}

module.exports = { FindAll, FindDocumentByID };
