module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 10
            }
        }
    }, {
        defaultScope: {
            where: {
                active: true
            }
        },
        scopes: {
            deleted: {
                where: {
                    // 有问题，会出现类似的SQL
                    // (`project`.`deletedAt` IS NULL AND `project`.`deletedAt` IS NOT NULL)
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
            }
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
        },
        timestamps: true, // updatedAt, createdAt
        paranoid: true, // 软删除
        freezeTableName: true, // 设置为true后，表名不会使用model的复数形式
        tableName: 'sys_user', // 表名
        engine: 'InnoDB', // MySql存储引擎  MyISAM. InnoDB
        comment: '用户表' // 表说明
    });

    return User;
};
