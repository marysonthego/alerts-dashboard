const LocalStrategy = require("passport-local").Strategy;
const pool = require("./dbConfig.mysql");
const bcrypt = require("bcrypt");

function initialize(passport) {

  function authenticateUser(email, pwd, done) {
    //const pool = require("./dbConfig.mysql");
    var sql = `SELECT * FROM customer WHERE email = "${email}"`;
    console.log(`authenticateUser email: `, email);
    console.log(`sql: `, sql);
    console.log(`pool: `, pool);
    pool.execute(sql, function(err, results) {
      if (err) {
        return done(err);
      };
      if (results.length > 0) {
        console.log(`results[0].email: `, results[0].email);
        const email = results[0];
      
        if(email.pwd) {
          email.pwd = email.pwd.trimEnd();
        } else {
          return done(null, false, {
            message: "Missing password in database",
          });
        }
        bcrypt.compare(pwd, email.pwd, function (err, isMatch) {
          if (err) {
            return done(err);
          }

          if (isMatch) {
            return done(null, email);
          } else {
            return done(null, false, {
              message: "Incorrect email or password",
            });
          }
        });
      } else {
        return done(null, false, { message: "Missing email or password" });
      }
    });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "pwd",
      },
      authenticateUser
    )
  );

  passport.serializeUser((email, done) => {
    //console.error(`serializeUser: `, email.custId);
    done(null, email.custid);
  });

  passport.deserializeUser((id, done) => {
    pool.query(`SELECT * from customer WHERE custid = "${id}"`, function(err, results) {
      if (err) {
        throw err;
      }
      //console.error(`deserializeUser: `, results);
      return done(null, results);
    });
  });
}

module.exports = initialize;
