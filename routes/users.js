var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {
    return res.status(401).json();
    res.json({
        username: 'tyk',
        email: 'tyk@gmail.com'
    });
});

module.exports = router;
