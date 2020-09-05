const mongoose = require("mongoose");
const { boolean } = require("@hapi/joi");

const SchemaUser = new mongoose.Schema({
  FirstName: { type: String, require: true },
  LastName: { type: String, require: true },
  DateOfBirth: { type: Date, require: true, trim: true },
  UserName: { type: String, require: true, min: 3 },
  Password: { type: String, require: true, min: 8, max: 255 },
  Token: { type: String },
  AccountNumber: { type: String, require: true },
  AccountUserName: { type: String, require: true },
  PasswordRegister: { type: String, require: true },
  PasswordPortal: { type: String, require: true },
  BuildingPlace: { type: String, require: true },
  IsWebConfigure: { type: Boolean, require: true },
});

const User = mongoose.model("users", SchemaUser);
module.exports = { User };
