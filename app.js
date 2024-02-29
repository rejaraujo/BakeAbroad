const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

//set up rate limiter: maximum of five requests per minute
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  max: 100, // up to 100 requests per windowMs
});

const recipesRouter = require("./src/routers/recipesRouter");
const classesRouter = require("./src/routers/classesRouter.js");
const adminRouter = require("./src/routers/adminRouter.js");
const authRoter = require("./src/routers/authRouter.js");

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json()); // used to be bodyparser.json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({ secret: "BakeAbroad" }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(limiter);

require("./src/config/passport.js")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/recipes", recipesRouter);
app.use("/classes", classesRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRoter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "BakeAbroad",
    isLoggedIn: req.isAuthenticated(),
  });
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  }); // it will clear he user's data
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
