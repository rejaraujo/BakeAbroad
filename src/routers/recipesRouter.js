const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const recipes = require("../data/recipes.json");
require("dotenv").config();
const recipesRouter = express.Router();

recipesRouter.route("/").get((req, res) => {
  const uri = process.env.MONGO_CONNECTION_STRING;
  const dbName = "BakeAbroad";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  async function mongo() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const recipes = await db.collection("recipes").find().toArray();
      // res.render("recipes", {recipes});
      res.render("recipes", {
        recipes,
        title: "BakeAbroad",
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (error) {
      debug(error.stack);
    } finally {
      await client.close();
    }
  }
  mongo();
});

//single recipe
recipesRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  const uri = process.env.MONGO_CONNECTION_STRING;
  const dbName = "BakeAbroad";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  async function mongo() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const recipe = await db
        .collection("recipes")
        .findOne({ _id: new ObjectId(id) });
      res.render("recipe", {
        recipe,
        title: "BakeAbroad",
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (error) {
      debug(error.stack);
    } finally {
      await client.close();
    }
  }
  mongo();
});

module.exports = recipesRouter;
