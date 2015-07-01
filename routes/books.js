/**
 * Book Route
 */
var express = require('express');
var router = express.Routre();

var books = require('../controllers/books');

/**
 * GET /api/books/search
 * 搜索图书信息
 */
router.get('/search', books.search);

/**
 * GET /api/books/901125
 * 查看图书信息
 */
router.get('/:id', books.view);

/**
 * POST /api/books/
 * 录入图书信息
 */
router.post('', books.create);

// router.get



