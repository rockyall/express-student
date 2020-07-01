module.exports = function (req, res, next) {
  console.log("Welcome Rick from the middleware");
  next();
};
