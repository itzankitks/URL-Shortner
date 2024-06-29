const jwt = require("jsonwebtoken");
const secret = "Ankit@123$";
// const sessionIdToUseMap = new Map();

function setUser(user) {
  // sessionIdToUseMap.set(id, user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }
  // return sessionIdToUseMap.get(id);
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
