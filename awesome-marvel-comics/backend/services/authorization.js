const passport = require("passport");
const BearerStrategy = require("passport-http-bearer");

const db = require("../db");

passport.use(
  new BearerStrategy(function (token, cb) {
    db.get(
      "SELECT * FROM access_tokens WHERE token = ?",
      [token],
      function (err, row) {
        console.log("GOT TOKEN");

        if (err) {
          return cb(err);
        }
        if (!row) {
          return cb(null, false);
        }
        var user = {
          id: row.user_id,
        };

        console.log('Authorized User: ', user);
        return cb(null, user);
      }
    );
  })
);

module.exports = passport.authenticate("bearer", { session: false });
