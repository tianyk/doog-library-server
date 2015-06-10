var express = require('express');
var router = express.Router();


// /* GET login page. */
// router.get('/', function(req, res) {
//     res.render('index', {
//         title: 'Express'
//     });
// });


router.post('/', function(req, res) {
    res.json({
        token: 'hello, world.'
    });
});

module.exports = router;
