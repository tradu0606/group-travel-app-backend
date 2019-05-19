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
    console.log(req.body.data.email)
    User.find({ email: req.body.data.email }).then(user => {
        console.log(user)
        Favorites.create({ like: req.body.data.like }).then(fav => {
            console.log(req.body.data.like)
            user[0].favorites.push(fav._id)
            user[0].save()
            console.log(user)
        })
        return res.send(200)
    }).catch(err => {
        console.log(err);
    })
})

app.get('/favorites', (req, res) => {
    console.log(req.body)
    let answer =[]
    User.find({ email: req.body.email }).then(user => {
        
            Favorites.find({ _id: { $in:  user[0].favorites} }).then(elem =>{
                console.log(elem)
                return res.json(elem)
            })
    }).catch(err => {
        console.log(err);
    });
})

app.delete("/favorites", (req, res) =>{
    Favorites.findOneAndDelete({ like: req.body.like}).then(()=>{
        return res.send(200)
    }).catch(err => console.log(err))
})

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
});
