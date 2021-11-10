const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {

  function authenticateUser(email, pwd, done) {

    pool.query(
      `SELECT * FROM customer WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          return done(err);
        }

        if (results.rows.length > 0) {
          const email = results.rows[0];
        
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
      }
    );
  }

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
    pool.query(`SELECT * from customer WHERE custid = $1`, [id], (err, results) => {
      if (err) {
        throw err;
      }
      //console.error(`deserializeUser: `, results.rows[0]);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
