const mongoose = require('mongoose');
const { databaseURL } = require('../config');

module.exports = () => {
  return mongoose.connect(databaseURL, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};