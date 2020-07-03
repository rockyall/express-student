const { options } = require("joi");
const mongoClient = require("mongodb").MongoClient;
const mongoURL = "mongodb://localhost:27017";
const DataBaseName = "unitec";
const collectionName = "currentclasses";
let mongodb;

function connectDB(callback) {
  
  mongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
    mongodb = client.db(DataBaseName);
    callback();
  });
}

function getDB() {
  return mongodb.collection(collectionName);
}

function closeDB() {
  if (mongodb) return;
  mongodb.close();
}

module.exports = { connectDB, getDB, closeDB };
