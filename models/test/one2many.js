/**
 * 包含多个
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


var User = sequelize.define('User', {name: Sequelize.STRING})
var Project = sequelize.define('Project', {name: Sequelize.STRING}, {underscored: true})

// OK. Now things get more complicated (not really visible to the user :)).
// First let's define a hasMany association
Project.hasMany(User, {as: 'Workers'});

sequelize.sync({
    force: true
});