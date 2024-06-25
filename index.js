const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./services/db_service");
const urlRouter = require("./routes/urlRoutes");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url_DBmodel");

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/URL-Shortner");

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
