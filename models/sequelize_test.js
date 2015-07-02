/**
 * [Sequelize description]
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var mysql = {
    database: 'sequelize',
    username: 'root',
    password: 'root'
}

var sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 3,
        idle: 10000
    }
});

var User = sequelize.define('user', {
    userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            max: 10
        }
    }
})

var Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    accessLevel: Sequelize.INTEGER
}, {
    paranoid: true,
    defaultScope: {
        where: {
            active: true
        }
    },
    scopes: {
        deleted: {
            where: {
                deletedAt: {
                    '$ne': null
                }
            }
        },
        activeUsers: {
            include: [{
                model: User,
                where: {
                    active: true
                }
            }]
        },
        random: function() {
            return {
                where: {
                    someNumber: Math.random()
                }
            }
        },
        accessLevel: function(value) {
            return {
                where: {
                    accessLevel: {
                        $gte: value
                    }
                }
            }
        }
    }
});

// sequelize.sync({
//     force: true
// });

// for (var i = 0; i < 10; i++) {
//     User
//         .create({
//             username: 'fnord_' + i
//         });
// }

// Project.sync({
//     force: true
// }).then(function() {
//     for (var i = 0; i < 10; i++) {
//         Project.create({
//             title: 'project_' + i,
//             active: true,
//             accessLevel: 1
//         });
//     }
// }).catch(function() {
// });

var async = require('async');

async.series([
    function(callback) {
        Project.sync({
            force: true
        }).then(function() {
            callback();
        }).catch(function(err) {
            callback(err);
        });
    },
    function(callback) {
        async.filter([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], function(index, callback) {
            Project.create({
                title: 'project_' + index,
                active: true,
                accessLevel: 1
            }).then(callback);
        }, function() {
            callback();
        })
    },
    function(callback) {
        // 删除
        Project.destroy({
            where: {
                title: 'project_1'
            }
        }).then(callback);
    },
    function(callback) {
        // 查询
        // 需要注意每次查询默认都加`deletedAt` IS NULL
        Project.scope('deleted', {
            method: ['accessLevel', 19]
        }).findAll();
    }
], function(err, results) {
    console.log(err);
    // 显示自start 而流逝的时间
    // console.log('Completed in ' + (new Date - start) + 'ms');
});
