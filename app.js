const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Use dynamic import for chalk
import("chalk")
  .then((chalk) => {
    const app = express();
    const recipeRouter = require("./src/routers/recipesRouter");

    app.use(morgan("tiny"));
    // app.use(express.static(path.join(__dirname, "public")));
    app.use(express.static("public"));

    console.log(process.env.PORT);

    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    app.use("/recipes", recipeRouter);

    // Single route for index.html
    app.get("/", (req, res) => {
      res.render("index", { title: "Bake Abroad " });
    });

    app.listen(PORT, () => {
      debug(`listening on port ${chalk.default.green(PORT)}`);
    });
  })
  .catch((error) => {
    debug("Error while importing chalk:", error);
  });
