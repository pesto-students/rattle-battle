
const express = require('express');
const { UserValidator } = require('./http/Validators/UserValidator');
const { UserFieldsError } = require('./middleware/UserFieldsError');
const { createNewUser, loginUser } = require('./Controllers/UserController');

const router = express.Router();

router.post('/api/signup', UserValidator, UserFieldsError, createNewUser);
router.post('/api/login', UserValidator, UserFieldsError, loginUser);

module.exports = router;
