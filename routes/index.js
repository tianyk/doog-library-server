var express = require('express');
var router = express.Router();

var users = require('./users');
var login = require('./login');

router.use('/users', users);
router.use('/login', login);

module.exports = router;
