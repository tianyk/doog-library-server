var express = require('express');
var router = express.Router();

var weixin = require('../../controllers/weixin');

router.get('/js-sdk', weixin.JSSdk);

module.exports = router;
