/**
 * config
 */
var config = {
    db: 'mongodb://127.0.0.1/node_club_test',
    logDir: __dirname + '/logs/',
    mysql: {
        host: '127.0.0.1',
        port: '',
        database: 'doog',
        username: 'root',
        password: 'root'
    }
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
    config.logDir = '/logs/';
}

module.exports = config;
