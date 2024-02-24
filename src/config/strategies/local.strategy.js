const passaport = require("passport");
const { Strategy } = require("passport-local");

module.exports = function localStrategy() {
  passaport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const user = { username, password, name: "Jaine" };
        done(null, user);
      }
    )
  );
};
