
const mongoose = require('../connection')
const bcrypt = require("bcrypt-nodejs")
const Schema = mongoose.Schema


var UserSchema = new Schema({
    email: String,
    password: String,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Favorites"
    }]
});

UserSchema.methods.encrypt = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);