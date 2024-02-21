const express = require("express");
const recipesRouter = express.Router();

const recipes = require("../data/recipes.json");

recipesRouter.route("/").get((req, res) => {
  res.render("recipes", {
    recipes,
    title: "Bake Abroad",
  });
});

recipesRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.render("recipe", { title: "Bake Abroad", recipe: recipes[id] });
});

module.exports = recipesRouter;
