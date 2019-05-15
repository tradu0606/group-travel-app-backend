const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/UserSchema");

module.exports = function(passport) {
  passport.serializeUser(function(user, callback) {
      console.log('serialize')
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
      console.log('deserialize')
    User.findById(id, function(err, user) {
        console.log(err, user)
      callback(err, user);
    });
  });

  console.log('passport top')

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
          console.log("passport sogn-up")
        User.findOne({ "email": email })
          .then(user => {
              console.log(email, password)
            console.log(user)

            console.log('passport user')
            if (user && user._id) {
                console.log('found user')
              return callback(
                null,
                false,
                req.flash("signupMessage", "this email is already taken")
              );
            } else {
                console.log('else')
              let newUser = new User();
              newUser.email = email;
              newUser.password = newUser.encrypt(password);

              newUser.save(err => {
                if (err) throw err;
                return callback(null, newUser);
              });
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
        User.findOne({ "email": email }, function(err, user) {
          if (err) return callback(err);

          if (!user) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "No user found")
            );
          }
          if (!user.validPassword(password)) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "Ooops, wrong password")
            );
          }
          return callback(null, user);
        });
      }
    )
  );
};