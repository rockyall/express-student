const Joi = require("@hapi/joi");

function ValidateInput(params) {
  const schema = Joi.object({
    FirstName: Joi.string().required().min(3).max(255),
    LastName: Joi.string().required().min(3).max(255),
    DateOfBirth: Joi.date(),
    UserName: Joi.string().required().min(3).max(255),
    Password: Joi.string().required().min(8).max(255),
    AccountNumber: Joi.string().required().min(3).max(255),
    AccountUserName: Joi.string().required(),
    PasswordRegister: Joi.string().required().min(3).max(255),
    PasswordPortal: Joi.string().required().min(3).max(255),
    BuildingPlace: Joi.string().min(3).max(255),
    IsWebConfigure: Joi.bool().required(),
  });
  const { error, value } = schema.validate(params);
  if (error === undefined) return { Isvalid: true, value: value, msj: null };
  return { Isvalid: false, value: value, msj: error };
}

module.exports.ValidateInput = ValidateInput;
