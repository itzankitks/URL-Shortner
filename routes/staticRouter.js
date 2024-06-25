const express = require("express");
const URL = require("../models/url_DBmodel");
const router = express.Router();

router.get("/", async (req, res) => {
    const allURLs = await URL.find({})
    return res.render("home_page", { urls: allURLs, });
})

module.exports = router;