/**
 * 微信OAuth2自动登录
 */
var debug = require('debug')('weixin_oauth');

/**
 * 判断是不是微信浏览器
 * @param  {[type]}  ua [description]
 * @return {Boolean}    [description]
 */
function isWeixinBrowser(ua){
    return (/micromessenger/.test(ua)) ? true : false ;
}

module.exports = function() {
    return function(req, res, next) {
        var UA = req.get('User-Agent');
        debug('isWeixinBrowser %s', isWeixinBrowser(UA));
        // doSomething
        // login success and redirect setcookie
        return next();
    }
}
