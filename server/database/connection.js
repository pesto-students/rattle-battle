const mongoose = require('mongoose');

const { DB_URL } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });

module.exports = mongoose;
