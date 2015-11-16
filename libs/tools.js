/**
 * 工具包
 */
var crypto = require('crypto');
var dateFormat = require('dateformat');
var _ = require('lodash');
var uuid = require('node-uuid');


exports.noop = function() {};


exports.defer = typeof setImmediate === 'function' ? setImmediate : function(fn) {
    process.nextTick(fn.bind.apply(fn, arguments))
};


// 加密
exports.encrypt = function(str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};


// 解密
exports.decrypt = function(str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


// MD5加密
exports.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};


exports.sha1 = function(str, encoding) {
    if (!encoding) encoding = 'utf-8';
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str, encoding);
    str = md5sum.digest('hex');
    return str;
}


// 格式化时间
// yyyy-mm-dd HH:MM:ss 2015-01-01 13:01:01
exports.formatDate = function(date, friendly) {
    if (_.isNumber(date)) date = new Date(date);
    return dateFormat(date, friendly || 'yyyy-mm-dd HH:MM');
};

// 生成随机数
exports.random = function(len) {
    if (len) {
        return _.times(len, _.partial(_.random, 0, 9, false)).join('');
    } else {
        return _.random(0, 1, true);
    }
}


// 校验是不是MongoDB unique约束错误
exports.isMongoUniqueError = function(err) {
    return (err instanceof Error && err.name === 'MongoError' && err.code === 11000)
}


// strtotime("+1 day");
// strtotime("next month +1 day");
// strtotime("last sunday");
// https://github.com/blaxmas/date-util
exports.strtotime = function(text, now) {
    var parsed, match, year, date, days, ranges, len, times, regex, i;
    if (!now) {
        now = _.now() / 1000;
    } else if (_.isNumber(now)) {
        now = now / 1000;
    } else if (_.isDate(now)) {
        now = now.getTime() / 1000;
    }

    if (!text) {
        return null;
    }
    // Unecessary spaces
    text = text.trim()
        .replace(/\s{2,}/g, ' ')
        .replace(/[\t\r\n]/g, '')
        .toLowerCase();

    if (text === 'now') {
        return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
    }
    if (!isNaN(parsed = Date.parse(text))) {
        return parsed / 1000 | 0;
    }
    if (text === 'now') {
        return new Date().getTime() / 1000; // Return seconds, not milli-seconds
    }
    if (!isNaN(parsed = Date.parse(text))) {
        return parsed / 1000;
    }

    match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
    if (match) {
        year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
        return new Date(year, parseInt(match[2], 10) - 1, match[3],
            match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
    }

    date = now ? new Date(now * 1000) : new Date();
    days = {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
    };
    ranges = {
        'yea': 'FullYear',
        'mon': 'Month',
        'day': 'Date',
        'hou': 'Hours',
        'min': 'Minutes',
        'sec': 'Seconds'
    };

    function lastNext(type, range, modifier) {
        var diff, day = days[range];

        if (typeof day !== 'undefined') {
            diff = day - date.getDay();

            if (diff === 0) {
                diff = 7 * modifier;
            } else if (diff > 0 && type === 'last') {
                diff -= 7;
            } else if (diff < 0 && type === 'next') {
                diff += 7;
            }

            date.setDate(date.getDate() + diff);
        }
    }

    function process(val) {
        var splt = val.split(' '),
            type = splt[0],
            range = splt[1].substring(0, 3),
            typeIsNumber = /\d+/.test(type),
            ago = splt[2] === 'ago',
            num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

        if (typeIsNumber) {
            num *= parseInt(type, 10);
        }

        if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
            return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
        }
        if (range === 'wee') {
            return date.setDate(date.getDate() + (num * 7));
        }

        if (type === 'next' || type === 'last') {
            lastNext(type, range, num);
        } else if (!typeIsNumber) {
            return false;
        }
        return true;
    }

    times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
        '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
        '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
    regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

    match = text.match(new RegExp(regex, 'gi'));
    if (!match) {
        return false;
    }

    for (i = 0, len = match.length; i < len; i++) {
        if (!process(match[i])) {
            return false;
        }
    }

    return date;
}

/**
 * [notEmpty description]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
var notEmpty = exports.notEmpty = function(val) {
    if (_.isString(val)) {
        return val.length > 0;
    } else {
        return !!val;
    }
}

/**
 * 获得待加密的字符串
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
exports.createLinkString = function(params) {
    return _.chain(params)
        .pick(notEmpty)
        .pairs()
        // .filter(function(v) {
        //     return !_.contains(['sign', 'sign_type', 'sign_version'], v[0]);
        // })
        .map(function(v) {
            return v.join('=')
        })
        .sortBy()
        .join('&')
        .value();
}

// console.log(exports.createLinkString({name: 'tyk', age: 100}))
