// weixin ctrl
var querystring = require('querystring');
var Q = require('q');

var config = require('../config');
var weixinService = require('../services/weixin');

exports.JSSdk = function(req, res, next) {
    var debug = req.body.debug;
    var url = req.get('Referrer');
    var jsApiList = req.query.jsApiList;
    console.log(jsApiList);
    if (jsApiList) {
        jsApiList = JSON.stringify(jsApiList.split(','));
    } else {
        jsApiList = '[\'onMenuShareTimeline\', ' + '\'onMenuShareAppMessage\', ' + '\'onMenuShareQQ\', '
            + '\'onMenuShareWeibo\', ' + '\'onMenuShareQZone\', ' + '\'startRecord\', ' + '\'stopRecord\', '
            + '\'onVoiceRecordEnd\', ' + '\'playVoice\', ' + '\'pauseVoice\', ' + '\'stopVoice\', '
            + '\'onVoicePlayEnd\', ' + '\'uploadVoice\', ' + '\'downloadVoice\', ' + '\'chooseImage\', '
            + '\'previewImage\', ' + '\'uploadImage\', ' + '\'downloadImage\', ' + '\'translateVoice\', '
            + '\'getNetworkType\', ' + '\'openLocation\', ' + '\'getLocation\', ' + '\'hideOptionMenu\', '
            + '\'showOptionMenu\', ' + '\'hideMenuItems\', ' + '\'showMenuItems\', ' + '\'hideAllNonBaseMenuItem\', '
            + '\'showAllNonBaseMenuItem\', ' + '\'closeWindow\', ' + '\'scanQRCode\', ' + '\'chooseWXPay\', '
            + '\'openProductSpecificView\', ' + '\'addCard\', ' + '\'chooseCard\', ' + '\'openCard\' ' + ']';
    }

    Q.nfcall(weixinService.signJSSdk, url)
        .then(function(data) {
            var js = ' wx.config({ \n' +
                ' debug: ' + !!debug + ', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。\n' +
                ' appId: \'' + config.weixin.appid + '\', // 必填，公众号的唯一标识 \n' +
                ' timestamp: ' + data.timestamp + ', // 必填，生成签名的时间戳 \n' +
                ' nonceStr: \'' + data.noncestr + '\', // 必填，生成签名的随机串 \n' +
                ' signature: \'' + data.signature + '\', // 必填，签名，见附录1 \n' +
                ' jsApiList: ' + jsApiList + ' // [\'scanQRCode\'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 \n' +
                ' }); \n';

            res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
            res.send(js);
        })
        .catch(next);
}
