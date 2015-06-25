/**
 * config
 */
var config = {
    db: 'mongodb://127.0.0.1/node_club_test',
    logDir: '/data/logs/'
}

// 差异配置
if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
    config.logDir = __dirname + '/logs/';
}

if (process.env.NODE_ENV === 'development') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
    config.logDir = __dirname + '/logs/';
}

if (process.env.NODE_ENV === 'production') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
    config.logDir = __dirname + '/logs/';
}

module.exports = config;