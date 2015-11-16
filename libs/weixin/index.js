// 微信API
//
//

var request = require('request');
var Q = require('q');

var redisService = require('../../services/redis');

module.exports = Weixin;

function Weixin(options) {
    if (!(this instanceof Weixin)) return new Weixin(options);
    this.appid = options.appid;
    this.secret = options.secret;
}

Weixin.prototype.getToken = function(cb) {
    var self = this;
    var rc = self.rc;

    Q.nfcall(redisService.get, 'dlwat:' + self.appid)
        .then(function(token) {
            var deferred = Q.defer();
            if (!token) {
                var url = 'https://api.Weixin.qq.com/cgi-bin/token';
                var qs = {
                    grant_type: 'client_credential',
                    appid: self.appid,
                    secret: self.secret
                }

                request.get({
                    url: url,
                    qs: qs,
                    json: true
                }, function(err, res, body) {
                    if (err) return deferred.reject(err);

                    var token = body.access_token;
                    var expire = body.expire_in;
                    if (token) {
                        redisService.set('dlwat:' + self.appid, token, expire - 200, function(err) {
                            if (err) return deferred.reject(err);
                            deferred.resolve(token);
                        });
                    } else {
                        deferred.reject(body);
                    }
                });

            } else {
                deferred.resolve(token);
            }
            return deferred.promise;
        })
        .then(function(token) {
            cb(null, token);
        })
        .catch(cb);
}


Weixin.prototype.getJsapiTicket = function(cb) {
    var self = this;
    var rc = self.rc;

    Q.nfcall(redisService.get, 'dlwjt:' + self.appid)
        .then(function(jsapiTicket) {
            var deferred = Q.defer();
            if (!jsapiTicket) {
                self.getToken(function(err, token) {
                    if (err) return deferred.reject(err);
                    var url = 'https://api.Weixin.qq.com/cgi-bin/ticket/getticket';
                    var qs = {
                        access_token: token,
                        type: 'jsapi'
                    }

                    request.get({
                        url: url,
                        qs: qs,
                        json: true
                    }, function(err, res, body) {
                        if (err) return deferred.reject(err);

                        if (body.errcode === 0) {
                            var ticket = body.ticket;
                            var expire = body.expire_in;

                            redisService.set('dlwjt:' + self.appid, ticket, expire - 200, function(err) {
                                if (err) return deferred.reject(err);
                                deferred.resolve(ticket);
                            });
                        } else {
                            deferred.reject(body);
                        }
                    })

                })

            } else {
                deferred.resolve(jsapiTicket);
            }
            return deferred.promise;
        })
        .then(function(jsapiTicket) {
            cb(null, jsapiTicket);
        })
        .catch(cb)
}


// var wx = new Weixin({
//     appid: 'wx32149df9290ce58d',
//     secret: '0406878290195982411b324b5c52881c'
// });

// wx.getToken(function(err, token) {
//     console.log(err, token);
// })

// wx.getJsapiTicket(function(err, token) {
//     console.log(err, token);
// });
