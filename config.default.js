/**
 * config
 */
var config = {
    db: 'mongodb://127.0.0.1/node_club_test',
    logDir: __dirname + '/logs/',
    debug: true,
    mysql: {
        host: '127.0.0.1',
        port: '',
        database: 'doog',
        username: 'root',
        password: 'root'
    },
    wx: {
        api: 'wx32149df9290ce58d',
        secret: '0406878290195982411b324b5c52881c'
    }
}

// 差异配置
if (process.env.NODE_ENV === 'test') {}

if (process.env.NODE_ENV === 'development') {}

if (process.env.NODE_ENV === 'production') {
    config.debug = false;
}

module.exports = config;
