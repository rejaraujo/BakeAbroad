const passaport = require("passport");
const { Strategy, localStrategy } = require("passport-local");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const debug = require("debug")("app:localStrategy");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = function localStrategy() {
  passaport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
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
        //add user
        async function addUser() {
          try {
            await client.connect();
            const db = client.db(dbName);
            debug("connected to mongoDB");
            const user = await db.collection("user").findOne({ username });

            //Add bcrypt.compareSync() for password validation
            if (user && bcrypt.compareSync(password, user.password)) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          } finally {
            await client.close();
          }
        }
        addUser();
      }
    )
  );
};
