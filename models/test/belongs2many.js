/**
 * 属于多个
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

var User = sequelize.define('User', {name: Sequelize.STRING}, {underscored: true})
var Project = sequelize.define('Project', {name: Sequelize.STRING}, {underscored: true})

// 创建一个中间表UserProject，以ProjectId, UserId为联合主键。ProjectId指向Project的ID，UserId指向User的ID。
// Project.belongsToMany(User, {through: 'UserProject'});
// User.belongsToMany(Project, {through: 'UserProject'});

// 自定义包含对象名字，以及外键名。
// User可以通过getTasks获取所属的Task（即Project）
// through中间表的名字
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })

// 自己引用自己
var Person = sequelize.define('Person', {name: Sequelize.STRING})
Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })

sequelize.sync({
    force: true
});