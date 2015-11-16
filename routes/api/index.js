var cors = require('cors');
var express = require('express');
var router = express.Router();

var weixin = require('./weixin');

router.use('/weixin', weixin);

module.exports = router;
