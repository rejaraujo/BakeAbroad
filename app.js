const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3000;

// Use dynamic import for chalk
import("chalk")
  .then((chalk) => {
    const app = express();

    app.use(morgan("tiny"));
    app.use(express.static(path.join(__dirname, "/public")));

    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    // Single route for index.html
    app.get("/", (req, res) => {
      res.render("index", { title: "BakeAbroad " });
    });

    app.listen(PORT, () => {
      debug(`listening on port ${chalk.default.green(PORT)}`);
    });
  })
  .catch((error) => {
    debug("Error while importing chalk:", error);
  });
