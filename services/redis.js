// redis 服务
var _ = require('lodash');

var rc = require('../libs/redis').rc;
var noop = require('../libs/tools').noop;

exports.get = function(key, cb) {
    if (!cb) cb = noop;
    rc.get(key, cb);
}

exports.getObject = function(key, cb) {
    if (!cb) cb = noop;
    rc.get(key, function(err, data) {
        if (err) return cb(err);
        if (data) {
            try {
                data = JSON.parse(data);
                cb(null, data);
            } catch (e) {
                cb(e);
            }
        } else {
            cb();
        }
    })
}

exports.set = exports.put = function(key, data, expire, cb) {
    if (!expire) {
        cb = noop;
    } else if (_.isFunction(expire)) {
        cb = expire;
        expire = null;
    }

    rc.set(key, data, function(err) {
        if (err) return cb(err);
        if (expire) {
            rc.expire(key, expire, cb);
        } else {
            cb();
        }
    });
}

exports.setObject = exports.putObject = function(key, data, expire, cb) {
    if (!expire) {
        cb = noop;
    } else if (_.isFunction(expire)) {
        cb = expire;
        expire = null;
    }

    try {
        data = JSON.stringify(data);
    } catch (e) {
        return cb(e);
    }

    rc.set(key, data, function(err) {
        if (err) return cb(err);
        if (expire) {
            rc.expire(key, expire, cb);
        } else {
            cb();
        }
    });
}


exports.del = function(key, cb) {
    rc.del(key, cb || noop);
}
