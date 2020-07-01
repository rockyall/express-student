module.exports = function auth(req, res, next) {
  console.log(
    "reading the enviroment variables for the authentication of the user"
  );
  next();
};
