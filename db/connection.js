const mongoose = require('mongoose');

if (process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.DB_URL, { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/travel', {
    useMongoClient: true
  });
}

mongoose.Promise = Promise;

module.exports = mongoose;