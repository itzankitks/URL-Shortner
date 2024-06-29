const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectToMongoDB } = require("./services/db_service");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth_middleware");

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
app.use(cookieParser());

// inline middleware.
// /url can only be accessed by login users if any req on /url first middleware will check if you are logged in or not
// if yes the urlRoute will be called.
app.use("/url", restrictToLoggedInUserOnly, urlRoute); 
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
