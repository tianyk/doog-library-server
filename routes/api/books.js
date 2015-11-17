var express = require('express');
var router = express.Router();

var BookCtrl = require('../../controllers/books');

router.get('/isbn/:isbn', BookCtrl.isbn);

// router.get('/:id', BookCtrl.item);

// router.get('/list', BookCtrl.list);

// router.page('/page', BookCtrl.page);

module.exports = router;