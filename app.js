const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const app = express();
const recipesRouter = require("./src/routers/recipesRouter");
const classesRouter = require("./src/routers/classesRouter.js");
const adminRouter = require("./src/routers/adminRouter.js");
const authRoter = require("./src/routers/authRouter.js");

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));
app.use(express.json()); // used to be bodyparser.json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "BakeAbroad" }));

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
