/**
 *
 */
var debug = require('debug')('doog-library-server-login');

module.exports = function() {
    return function(req, res, next) {
        console.log(req.xhr);
        if (req.xhr) {
            var location = req.get('location');
            console.log(location);
            if (location)
                res.set('location', location);
            next()
        } else {
            next();
        }
    }
};
