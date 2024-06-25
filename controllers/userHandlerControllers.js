const USER = require("../models/user_DBmodel");

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
    return res.render("logIn_page", {
        error: "Invalid email or password",
    });
  }
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
