require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = Promise;

module.exports.User = require('./user');
