const User = require("../models/UserSchema");
const Favorites = require("../models/Favorites");
const passport = require("passport");

module.exports = {
  show: (req, res) => {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "favorites",
        options: { limit: 10, sort: { createdAt: -1 } }
      })
      .then(user => {
        res.json(user);
      });
  },
  createLogin: (req, res) => {
    const login = passport.authenticate("local-login", {
      successRedirect: "/picture",
      failureRedirect: "/login",
      failureFlash: true
    });



    return login(req, res);
  },
  createSignUp: (req, res) => {
    console.log("sign-up controller")
    const signup = passport.authenticate("local-signup", {
      successRedirect: "/picture",
      failureRedirect: "/sign-up",
      failureFlash: true
    });

    return signup(req, res);
  },
  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },
  test: (req, res) => {
    res.send('hello')
  }
};