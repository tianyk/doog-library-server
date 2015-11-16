var Redis = require('redis');
var config = require('../config');

var getRedisClient = exports.getRedisClient = function(rcc) {
    var rc = Redis.createClient(rcc.port, rcc.host, rcc);

    rc.on('error', function(err) {
        console.error('Redis Error: %s, %s', rcc, err);
    });
    rc.on('end', function(err) {
        console.log('Redis end: %s, %s', rcc, err);
    })
    rc.on('ready', function(err) {
        console.log('Redis ready: %s, %s', rcc, err);
    })

    return rc;
}


exports.getRedisClient = getRedisClient;
exports.rc = getRedisClient(config.rcc);
