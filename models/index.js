/**
 * [Sequelize description]
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var mysql = require('../config').mysql;

var sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 3,
        idle: 10000
    }
});

var User = sequelize.import(__dirname + '/user');
var Book = sequelize.import(__dirname + '/book');

exports.user = User;
exports.book = Book;

// var User = sequelize.import('User', require('./user'));
// var fs = require('fs');
// var path = require('path');
// var db = {};
// fs
//     .readdirSync(__dirname)
//     .filter(function(file) {
//         return (file.indexOf(".") !== 0) && (file !== "index.js");
//     })
//     .forEach(function(file) {
//         var model = sequelize.import(path.join(__dirname, file));
//         console.log(model);
//         db[model.name] = model;
//     });

// var User = sequelize.define('user', {
//     userId: {
//         field: 'user_id',
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         validate: {
//             max: 10
//         }
//     }
// }, {
//     timestamps: true, // updatedAt, createdAt
//     paranoid: true, // 软删除
//     freezeTableName: true, // 设置为true后，表名不会使用model的复数形式
//     tableName: 'sys_user', // 表名
//     engine: 'InnoDB', // MySql存储引擎  MyISAM. InnoDB
//     comment: '用户表' // 表说明
// });

// User.sync({
//     force: true
// });

// User
//     .create({
//         username: 'tyk'
//     })
//     .then(function(user) {
//         console.log(user.get({
//             plain: true
//         }));
//     })


// // search for known ids
// User.findById(2).then(function(user) {
//     console.log(user.get({
//         plain: true
//     }));
// })

// // // search for attributes
// User.findOne({
//     where: {
//         username: 'tyk'
//     }
// }).then(function(user) {
//     if (!user)
//         console.log(user.get({
//             plain: true
//         }));
// })


// User.findOne({
//     where: {
//         username: 'tyk'
//     },
//     attributes: ['id', ['name', 'title']]
// }).then(function(user) {
//     // User will be the first entry of the Users table with the title 'aUser' || null
//     // User.title will contain the name of the User
// })
