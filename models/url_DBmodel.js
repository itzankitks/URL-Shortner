const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    originalURL: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const URL = new mongoose.model("url", urlSchema);

module.exports = URL;
