var cors = require('cors');
var express = require('express');
var router = express.Router();

var users = require('./users');
var login = require('./login');

router.use('/users', cors({exposedHeaders: 'location'}), users);
router.use('/login', cors({exposedHeaders: 'location'}), login);

module.exports = router;
