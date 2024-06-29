const express = require("express");
const URL = require("../models/url_DBmodel");
const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const currentUser = req.user;
    const allURLs = await URL.find({ createdBy: currentUser._id })
    return res.render("home_page", { urls: allURLs });
});

router.get("/signup", (req, res) => {
    return res.render("signUp_page");
});

router.get("/login", (req, res) => {
    return res.render("logIn_page");
});

module.exports = router;