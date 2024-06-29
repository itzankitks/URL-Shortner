const express = require("express");
const URL = require("../models/url_DBmodel");
const { restrictTo } = require("../middlewares/auth_middleware");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  // if(!req.user) return res.redirect('/login');
//   const currentUser = req.user;
  const allURLs = await URL.find({});
  return res.render("home_page", { urls: allURLs, currentUser: req.user });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if(!req.user) return res.redirect('/login');
  const currentUser = req.user;
  if (currentUser.role == "ADMIN") {
    res.redirect("/admin/urls");
  } else {
    const allURLs = await URL.find({ createdBy: currentUser._id });
    return res.render("home_page", { urls: allURLs, currentUser: req.user });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signUp_page");
});

router.get("/login", (req, res) => {
  return res.render("logIn_page");
});

module.exports = router;
