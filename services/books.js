/**
 * Book Service
 */

var Book = require('../models').book;

/**
 * 搜索图书
 * @param  {[type]} q     查询关键字
 * @param  {[type]} tag   查询的tag
 * @param  {[type]} start 取结果的offset
 * @param  {[type]} count 取结果的条数
 * @param  {[type]} cb    [description]
 * @return {[type]}       [description]
 */
function search(q, tag, start, count, cb) {
    var query = {};
    if (!q) qeury.q = q;
    if (!tag) query.tag = tag;

    Book.findAll({
        where: query,
        offset: start,
        limit: count
    }, function(err, books) {
        return cb(err, books);
    });
}


/**
 * 数量汇总
 * @param  {[type]} q   查询关键字
 * @param  {[type]} tag 查询的tag
 * @param  {[type]} cb  [description]
 * @return {[type]}     [description]
 */
function count(q, tag, cb) {
    var query = {};
    if (!q) qeury.q = q;
    if (!tag) query.tag = tag;

    Book.count({
        where: query
    }, function(err, total) {
        return cb(err, total);
    })
}


/**
 * [get description]
 * @param  {[type]}   id [description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
function get(id, cb) {
    Book.findById(id, function(err, book) {
        return cb(err, book);
    })
}
