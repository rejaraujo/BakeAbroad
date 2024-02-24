const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient, ServerApiVersion } = require("mongodb");
const recipes = require("../data/recipes.json");
require("dotenv").config();
const classesRouter = express.Router();

classesRouter.route("/").get((req, res) => {
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
      res.render("classes", { recipes, title: "Bake Abroad" });
    } catch (error) {
      debug(error.stack);
    } finally {
      await client.close();
    }
  }
  mongo();
});

module.exports = classesRouter;
