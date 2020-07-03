const db = require("../db");

// NativeDriverFunctions

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
  } catch (error) {}
}

module.exports = { FindAll, FindDocumentByID };
