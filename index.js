const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./services/db_service");

const URL = require("./models/url_DBmodel");

const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/userRoutes");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/URL-Shortner");

app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
