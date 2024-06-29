const { getUser } = require("../services/auth_service");

async function restrictToLoggedInUserOnly(req, res, next) {
  // now lets use headers
  // const userID = req.cookies.uid;

  const userID = req.headers["authorization"];

  if (!userID) {
    return res.redirect("/login");
  }

  const token = userID.split("Bearer ")[1];
  const user = getUser(token);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // const userID = req.cookies.uid;

  // const user = getUser(userID);

  const userID = req.headers["authorization"];

  const token = userID.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
