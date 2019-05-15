const mongoose = require('../connection')

var FavoritesSchema = new mongoose.Schema({
    like: String
});

module.exports = mongoose.model("Favorites", FavoritesSchema);