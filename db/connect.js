const mongoose = require('mongoose');

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI, { dbName: 'cse341-movies' });
};

module.exports = connectDb;