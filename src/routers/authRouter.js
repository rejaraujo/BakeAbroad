const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const passport = require("passport");
require("dotenv").config();

const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;
  //basic on mongodb
  const uri = process.env.MONGO_CONNECTION_STRING;
  const dbName = "BakeAbroad";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function addUser() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const user = { username, password };
      const results = await db.collection("user").insertOne(user);
      debug(results);
      //TODO create user
      req.login(results, () => {
        res.redirect("/");
      });
    } catch (error) {
      debug(error.stack);
    } finally {
      await client.close();
    }
  }
  addUser();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin", {
      title: "BakeAbroad",
      isLoggedIn: req.isAuthenticated(),
    });
  })
  //authenticate so instead of req and res I can use passport.authenticate;
  .post(
    passport.authenticate("local", {
      successRedirect: "/classes",
      failureRedirect: "/#sign-up",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
