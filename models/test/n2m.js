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


var ItemTag = sequelize.define('item_tag', {
    tag_id: {
        type: Sequelize.INTEGER,
        unique: 'item_tag_taggable'
    },
    taggable: {
        type: Sequelize.STRING,
        unique: 'item_tag_taggable'
    },
    taggable_id: {
        type: Sequelize.INTEGER,
        unique: 'item_tag_taggable',
        references: null
    }
});

var Post = sequelize.define('post', {
    name: Sequelize.STRING
});


var Tag = sequelize.define('tag', {
    name: Sequelize.STRING
});

Post.belongsToMany(Tag, {
    through: {
        model: ItemTag,
        unique: false,
        scope: {
            taggable: 'post'
        }
    },
    foreignKey: 'taggable_id',
    constraints: false
});


Tag.belongsToMany(Post, {
    through: {
        model: ItemTag,
        unique: false
    },
    foreignKey: 'tag_id'
});


sequelize.sync({
    force: true
});