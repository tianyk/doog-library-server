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

var Children = sequelize.define('children', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
})


var Parent = sequelize.define('parent', {
    name: Sequelize.STRING
});

// Children.belongsTo(Parent);
sequelize.sync({
    force: true
});