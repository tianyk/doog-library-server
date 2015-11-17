var express = require('express');
var router = express.Router();

var WeixinCtrl = require('../../controllers/weixin');

router.get('/js-sdk', WeixinCtrl.JSSdk);

module.exports = router;
