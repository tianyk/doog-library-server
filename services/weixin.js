// Weixin
var Q = require('q');
var randomString = require('randomstring');

var Weixin = require('../libs/weixin');

var config = require('../config');
var tools = require('../libs/tools');
var createLinkString = tools.createLinkString;
var sha1 = tools.sha1;

var wx = new Weixin({
    appid: config.weixin.appid,
    secret: config.weixin.secret
});


exports.signJSSdk = function(url, cb) {
    Q.nfcall(wx.getJsapiTicket.bind(wx))
        .then(function(jsapiTicket) {
            var data = {
                noncestr: randomString.generate(),
                jsapi_ticket: jsapiTicket,
                timestamp: parseInt(Date.now() / 1000),
                url: url
            };

            var content = createLinkString(data);
            try {
                data.signature = sha1(content);
                delete data.jsapi_ticket;
            } catch (e) {
                throw e;
            }

            return data;
        })
        .then(function(data) {
            cb(null, data);
        })
        .catch(cb);
}


exports.signJSSdk('http://www.doog.com', function(err, data) {
    console.log(err, data);
})
