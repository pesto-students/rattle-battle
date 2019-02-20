
require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

module.exports = app;
