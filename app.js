const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
const recipesRouter = require("./src/routers/recipesRouter");
const classesRouter = require("./src/routers/classesRouter.js");
const adminRouter = require("./src/routers/adminRouter.js");

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public/")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/recipes", recipesRouter);
app.use("/classes", classesRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Bake Abroad" });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});

// const express = require("express");
// const debug = require("debug")("app");
// const morgan = require("morgan");
// const path = require("path");
// const chalk = require("chalk");

// const PORT = process.env.PORT || 3000;

// const app = express();
// const recipeRouter = require("./src/routers/recipesRouter");
// const adminRouter = require("./src/routers/adminRouter");

// app.use(morgan("tiny"));
// app.use(express.static(path.join(__dirname, "public")));

// app.set("views", "./src/views");
// app.set("view engine", "ejs");

// app.use("/recipes", recipeRouter);
// app.use("/admin", adminRouter);

// app.get("/", (req, res) => {
//   res.render("index", { title: "Bake Abroad " });
// });

// app.get("/video-classes", (req, res) => {
//   res.render("video-classes", { title: "Bake Abroad " });
// });

// app.listen(PORT, () => {
//   debug(`listening on port ${chalk.green(PORT)}`);
// });
