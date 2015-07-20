/**
 * 藏书
 */

module.exports = function(sequelize, DataTypes) {
        var CollectBook = sequelize.define('collect_book', {
                userId: {
                    field: 'user_id',
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                bookId: {
                    field: 'book_id',
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                state: {
                    defaultValue: 'await'
                }
            }
        }
