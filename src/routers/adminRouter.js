const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient, ServerApiVersion } = require("mongodb");
const recipes = require("../data/recipes.json");
require("dotenv").config();
const adminRouter = express.Router();
adminRouter.route("/").get((req, res) => {
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
      const response = await db.collection("recipes").insertMany(recipes);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    } finally {
      await client.close();
    }
  }
  mongo();
});

module.exports = adminRouter;
