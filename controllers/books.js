/**
 * Book Controller
 */
var EventProxy = require('eventproxy');

var Books = require('../services/books');
var constants = require('../constants');

/**
 * [search description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function search(req, res, next) {
    var q = req.qeury.q;
    var tag = req.query.tag;
    var start = req.query.start || 0;
    var count = req.query.start || constants.DEFAULT_PAGE_COUNT;

    var ep = new EventProxy();
    ep.all('search', 'count', function(books, total) {
        res.json({
            "start": start,
            "count": count,
            "total": total,
            "books": books
        })
    });
    ep.fail(next);

    Books.search(q, tag, start, count, ep.done('search'));
    Books.count(q, tag, ep.done('count'));
}

/**
 * [view description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function view(req, res, next) {
    var bookId = req.params.id;

    Books.get(bookId, function (err, book) {
        if (err) return next(err);

    })
}

/**
 * [create description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function create(req, res, next) {

}
