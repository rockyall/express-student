const express = require("express");
const router = express.Router();
const { User } = require("../modules/user_model");
const { ValidateInput } = require("../validations/Schema_User");

router.post("test", (req, resp) => {
  resp.send("This is the new change");
});

router.post("/save", async (req, res) => {
  const element = req.body;
  console.log(element);
  const validation = ValidateInput(element);
  const existUser = await User.findOne({
    AccountNumber: { $eq: element.AccountNumber },
  });

  if (existUser !== null) {
    res.send("El usuario ya existe");
    return;
  }

  if (!validation.Isvalid) {
    res.send(
      `Your inputs are not valid, please consider this: ${validation.msj}`
    );
    return;
  }
  SaveDocument(element, res);
});

router.get("/:account", async (req, res) => {
  const Account = req.params.account;
  const existUser = await User.findOne({
    AccountNumber: { $eq: Account },
  });
  if (existUser === null) {
    res.send("El usuario no exite");
    return;
  }
  res.send(existUser);
});

function SaveDocument(element, res) {
  const user = new User(element);
  user
    .save()
    .then((resp) => {
      console.log(resp);
      res.status(200).send("Saved");
    })
    .catch((error) => {
      console.log(error);
      resp.send(error);
    });
}

module.exports = router;
