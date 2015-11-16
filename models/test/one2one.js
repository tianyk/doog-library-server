/**
 * 包含、属于一个
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

// 没有主键会自动添加主键
var Player = sequelize.define('Player', {
        name: Sequelize.STRING
    }),
    Team = sequelize.define('Team', {
        name: Sequelize.STRING
    });


// 自动在Player上添加一个外键TeamId连接到Team的主键ID
Player.belongsTo(Team); // Will add a TeamId attribute to Player to hold the primary key value for Team


var User = sequelize.define('User', {name: Sequelize.STRING})
  , Company  = sequelize.define('Company', {name: Sequelize.STRING});

// 无法创建
// User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'}); // Adds fk_companyname to User

var Project = sequelize.define('Project', {name: Sequelize.STRING});
// 在User上添加一个外键initiator_id指向Project的ID
Project.hasOne(User, { foreignKey: 'initiator_id' });

// BelongsTo will add the foreignKey on the source where hasOne will add on the target.
// BelongsTo会在源对象上添加一个外键，hasOne会在目标对象上添加一个外键
sequelize.sync({
    force: true
})
