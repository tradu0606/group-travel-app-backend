const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const User = require('./db/models/UserSchema')
const Favorites = require('./db/models/Favorites')

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(parser.json());
app.use(cors());

app.post('/favorites', (req, res) => {
    User.findOne({ email: req.body.data.email }).then(user => {
        console.log(user)
        Favorites.create({ like: req.body.data.url }).then(fav => {
        user.favorites.push(fav._id)
        user.save()
        console.log(user)
        })
    }).catch(err => {
        console.log(err);
    })
})

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});
