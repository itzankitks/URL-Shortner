const { getUser } = require("../services/auth_service");

// Authentication
function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) {
    return next();
  }
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  next();
}

// Authorization
function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorised");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};

// async function restrictToLoggedInUserOnly(req, res, next) {
//   // now lets use headers
//   // const userID = req.cookies.uid;

//   const userID = req.headers["authorization"];

//   if (!userID) {
//     return res.redirect("/login");
//   }

//   const token = userID.split("Bearer ")[1];
//   const user = getUser(token);

//   if (!user) {
//     return res.redirect("/login");
//   }

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userID = req.cookies.uid;

//   // const user = getUser(userID);

//   const userID = req.headers["authorization"];

//   const token = userID.split("Bearer ")[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

// module.exports = {
//   restrictToLoggedInUserOnly,
//   checkAuth,
// };
