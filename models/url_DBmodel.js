const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    shortenURL: {
      type: String,
      default: "",
    },
    originalURL: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
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
