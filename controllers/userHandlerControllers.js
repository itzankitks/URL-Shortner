const { v4: uuidv4 } = require("uuid");
const USER = require("../models/user_DBmodel");
const { setUser, getUser } = require("../services/auth_service");

async function handleUserSignUp(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Some Fields are missing" });
  }
  const { name, email, password } = req.body;
  await USER.create({
    name: name,
    email: email,
    password: password,
  });
  return res.redirect("/");
}

async function handleUserLogIn(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "Some Fields are missing" });
  }
  const { email, password } = req.body;

  const user = await USER.findOne({
    email:  email,
    password: password,
  });

  if (!user) {
    // return res.redirect("/login");
    return res.render("logIn_page", {
        error: "Invalid email or password",
    });
  }

  /// no longer use of sessionId as jwt installed will create tokens
  // const sessionID = uuidv4();

  const token = await setUser(user);

  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
