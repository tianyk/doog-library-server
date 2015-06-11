/**
 *
 */
var debug = require('debug')('doog-library-server-login');

module.exports = function() {
    return function(req, res, next) {
        if (req.xhr) {
            var location = req.get('location');
            debug('location: %s', location);
            if (location)
                res.set('location', location);
            next()
        } else {
            next();
        }
    }
};
