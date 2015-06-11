var express = require('express');
var router = express.Router();

var WeiXinOAuth2 = require('../middlewares/weixin_oauth');

/* GET login page. */
router.get('/', WeiXinOAuth2(), function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    // return res.status(400).json();
    res.json({
        token: new Date().getTime()
    });
});

module.exports = router;
