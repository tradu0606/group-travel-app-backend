const express = require("express");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require('cors');
const Favorites = require('./db/models/Favorites')
const User =require('./db/models/UserSchema')
const app = express();
const router = express.Router();


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "EXPRESS-IS-AWESOME",
    saveUninitialized: true,
    resave: false
  })
);

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });
app.set('port', process.env.PORT || 3001);
app.use(cors());

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



// app.use('/', require('./db/routes/UserRoute'));



// app.get('/data', (req, res) => {
//     User.find()
//       .then(data => {
//         res.json(data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });

//   app.post('/login', (req, res) => {
//     User.create(req.body)
//     .then(login => {
//       res.json(login);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   });
//   app.post('/create', (req, res) => {
//     User.create(req.body)
//     .then(login => {
//       res.json(login);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   });

  app.post('/favorites', (req, res) => {
      User.findOneAndUpdate({email: req.body.email}).then(user =>{
        user.favorites.push(Favorites.create({like: req.body.url}))
      })
  })

app.listen(app.get('port'), () => {
  console.log('Server listening on port ' + app.get('port'));
});
