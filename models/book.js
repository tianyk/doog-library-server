/**
 * Book model
 */
// create table `sys_book`(
// `book_id` bigint not null auto_increment,
// `title` varchar(100) not null,
// `isbn10` char(10),
// `isbn13` char(13),
// constraint `pk_sys_book` primary key(`book_id`)
// ) charset=utf8 ENGINE=InnoDB;
// alter table `sys_book` auto_increment=100000;

module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('book', {
        bookId: {
            field: 'book_id',
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 10
            }
        },
        isbn10: {
            type: DataTypes.STRING
        }
        isbn13: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true, // updatedAt, createdAt
        paranoid: true, // 软删除
        freezeTableName: true, // 设置为true后，表名不会使用model的复数形式
        tableName: 'sys_book', // 表名
        engine: 'InnoDB', // MySql存储引擎  MyISAM. InnoDB
        comment: '书籍信息表' // 表说明
    });

    return Book;
};
