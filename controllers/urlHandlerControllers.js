const shortid = require("shortid");
const URL = require("../models/url_DBmodel");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  console.log("body:", body);
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  shortID = shortid();

  await URL.create({
    shortID: shortID,
    originalURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetUrlByID(req, res) {
  const shortID = req.params.shortId;
  if (!shortID) return res.status(400).json({ error: "ID is required" });
  const entry = await URL.findOneAndUpdate(
    { shortID: shortID },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }, 
    //Returning the updated document
    { new: true, upsert: true }
  );

  const updatedEntry = await URL.findOneAndUpdate(
    { shortID: shortID },
    {
      $set: {
        clicks: entry.visitHistory.length,
      },
    },
    { new: true, upsert: true }
  );

  if (!entry) return res.status(404).json({ error: "No Record Found" });
  res.redirect(updatedEntry.originalURL);
}

async function handleGetAnalytics (req, res) {
    const shortID = req.params.shortId;
    if (!shortID) return res.status(400).json({ error: "ID is required" });

    const entry = await URL.findOne({
        shortID: shortID,
    })

    if (!entry) return res.status(404).json({ error: "No Record Found"});
    res.json({ totalClicks: entry.clicks, analytics: entry.visitHistory });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetUrlByID,
  handleGetAnalytics,
};
